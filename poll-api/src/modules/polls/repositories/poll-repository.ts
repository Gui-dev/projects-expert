import { type Poll } from '@prisma/client'
import { type IPollRepositoryContract } from '../contracts/poll-repository-contract'
import { prisma } from '../../../shared/services/prisma'
import { type ICreatePollDTO } from '../dtos/create-poll-dto'
import { type GetPollResponseValidation } from '../validations/get-poll-validation'

export class PollRepository implements IPollRepositoryContract {
  public async create({ title, options }: ICreatePollDTO): Promise<Poll> {
    const poll = await prisma.poll.create({
      data: {
        title,
        poll_options: {
          createMany: {
            data: options.map((option) => {
              return {
                title: option,
              }
            }),
          },
        },
      },
    })

    return poll
  }

  public async findPollById(
    id: string,
  ): Promise<GetPollResponseValidation | null> {
    const poll = await prisma.poll.findUnique({
      where: {
        id,
      },
      include: {
        poll_options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return poll
  }
}
