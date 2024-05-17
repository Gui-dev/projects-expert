import { type IPollRepositoryContract } from '../contracts/poll-repository-contract'
import { PollRepository } from '../repositories/poll-repository'
import { redis } from '../../../shared/services/redis'

interface IGetPollResponse {
  id: string
  title: string
  options: Array<{
    id: string
    title: string
    score: number
  }>
}

export class GetPoll {
  public readonly pollRepository: IPollRepositoryContract

  constructor() {
    this.pollRepository = new PollRepository()
  }

  public async execute(poll_id: string): Promise<IGetPollResponse> {
    const poll = await this.pollRepository.findPollById(poll_id)

    if (!poll) {
      throw new Error('Poll not found')
    }

    const result = await redis.zrange(poll_id, 0, -1, 'WITHSCORES')
    const votes = result.reduce<Record<string, number>>(
      (object, line, index) => {
        if (index % 2 === 0) {
          const score = result[index + 1]
          Object.assign(object, { [line]: Number(score) })
        }

        return object
      },
      {},
    )

    const poll_response = {
      id: poll.id,
      title: poll.title,
      options: poll.poll_options.map((option) => {
        return {
          id: option.id,
          title: option.title,
          score: option.id in votes ? votes[option.id] : 0,
        }
      }),
    }

    return poll_response
  }
}
