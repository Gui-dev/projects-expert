import { type IPollRepositoryContract } from '../contracts/poll-repository-contract'
import { PollRepository } from '../repositories/poll-repository'
import { type CreatePollResponse } from '../validations/create-poll-validation'

interface ICreatePoll {
  title: string
}

export class CreatePoll {
  public readonly pollRepository: IPollRepositoryContract

  constructor() {
    this.pollRepository = new PollRepository()
  }

  public async execute({ title }: ICreatePoll): Promise<CreatePollResponse> {
    const poll = await this.pollRepository.create(title)

    if (!poll) {
      throw new Error('Error to create poll')
    }

    return {
      poll_id: poll.id,
    }
  }
}
