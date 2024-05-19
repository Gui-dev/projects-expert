import { type Vote } from '@prisma/client'
import { type ICreateVoteDTO } from '../dtos/create-vote-dto'
import { type IVoteRepositoryContract } from '../contracts/vote-repository-contract'
import { VoteRepository } from '../repositories/vote-repository'
import { redis } from '../../../shared/services/redis'
import { voting } from '../../websocket/services/voting-pub-sub'
// import { type IVotingPubSubContract } from '../../websocket/contracts/voting-pub-sub-contract'

export class CreateVote {
  public readonly vote_repository: IVoteRepositoryContract

  constructor() {
    this.vote_repository = new VoteRepository()
  }

  public async execute({
    poll_id,
    poll_option_id,
    session_id,
  }: ICreateVoteDTO): Promise<Vote> {
    const userPreviousVoteOnPoll =
      await this.vote_repository.findVoteBySessionID({
        poll_id,
        session_id,
      })

    if (
      userPreviousVoteOnPoll &&
      userPreviousVoteOnPoll.poll_option_id !== poll_option_id
    ) {
      await this.vote_repository.delete(userPreviousVoteOnPoll.id)
      const votes = await redis.zincrby(
        poll_id,
        -1,
        userPreviousVoteOnPoll.poll_option_id,
      )
      voting.publisher(poll_id, {
        poll_option_id: userPreviousVoteOnPoll.poll_option_id,
        votes: Number(votes),
      })
    } else if (userPreviousVoteOnPoll) {
      throw new Error('You already voted on this poll')
    }

    const vote = await this.vote_repository.create({
      poll_id,
      poll_option_id,
      session_id,
    })

    if (!vote) {
      throw new Error('Error to vote')
    }

    const votes = await redis.zincrby(poll_id, 1, poll_option_id)
    voting.publisher(poll_id, {
      poll_option_id,
      votes: Number(votes),
    })

    return vote
  }
}
