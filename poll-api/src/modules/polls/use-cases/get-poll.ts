import { type Poll } from '@prisma/client'
import { type IPollRepositoryContract } from '../contracts/poll-repository-contract'
import { PollRepository } from '../repositories/poll-repository'

export class GetPoll {
  public readonly pollRepository: IPollRepositoryContract

  constructor() {
    this.pollRepository = new PollRepository()
  }

  public async execute(poll_id: string): Promise<Poll> {
    const poll = await this.pollRepository.findPollById(poll_id)

    if (!poll) {
      throw new Error('Poll not found')
    }

    return poll
  }
}
