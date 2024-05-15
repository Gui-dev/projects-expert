import { type IPollRepositoryContract } from '../contracts/poll-repository-contract'
import { type ICreatePollDTO } from '../dtos/create-poll-dto'
import { PollRepository } from '../repositories/poll-repository'
import { type CreatePollResponse } from '../validations/create-poll-validation'

export class CreatePoll {
  public readonly pollRepository: IPollRepositoryContract

  constructor() {
    this.pollRepository = new PollRepository()
  }

  public async execute({
    title,
    options,
  }: ICreatePollDTO): Promise<CreatePollResponse> {
    const poll = await this.pollRepository.create({ title, options })

    if (!poll) {
      throw new Error('Error to create poll')
    }

    return {
      poll_id: poll.id,
    }
  }
}
