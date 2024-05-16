import { type Vote } from '@prisma/client'
import { type ICreateVoteDTO } from '../dtos/create-vote-dto'
import { type IVoteRepositoryContract } from '../contracts/vote-repository-contract'
import { VoteRepository } from '../repositories/vote-repository'

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

    return vote
  }
}
