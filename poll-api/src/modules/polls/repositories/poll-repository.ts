import { type Poll } from '@prisma/client'
import { type IPollRepositoryContract } from '../contracts/poll-repository-contract'
import { prisma } from '../../../shared/services/prisma'

export class PollRepository implements IPollRepositoryContract {
  public async create(title: string): Promise<Poll> {
    const poll = await prisma.poll.create({
      data: {
        title,
      },
    })

    return poll
  }
}
