import { type Vote } from '@prisma/client'
import { type IVoteRepositoryContract } from '../contracts/vote-repository-contract'
import { type ICreateVoteDTO } from '../dtos/create-vote-dto'
import { prisma } from '../../../shared/services/prisma'
import { type IFindVoteBySessionId } from '../dtos/find-vote-by-session-id'

export class VoteRepository implements IVoteRepositoryContract {
  public async findVoteBySessionID({
    poll_id,
    session_id,
  }: IFindVoteBySessionId): Promise<Vote | null> {
    const vote = await prisma.vote.findUnique({
      where: {
        poll_id_session_id: {
          poll_id,
          session_id,
        },
      },
    })

    return vote
  }

  public async create({
    poll_id,
    poll_option_id,
    session_id,
  }: ICreateVoteDTO): Promise<Vote> {
    const vote = await prisma.vote.create({
      data: {
        poll_id,
        poll_option_id,
        session_id,
      },
    })

    return vote
  }

  public async delete(vote_id: number): Promise<void> {
    await prisma.vote.delete({
      where: {
        id: vote_id,
      },
    })
  }
}
