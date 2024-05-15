import { type Poll } from '@prisma/client'
import { type ICreatePollDTO } from '../dtos/create-poll-dto'

export interface IPollRepositoryContract {
  create: (data: ICreatePollDTO) => Promise<Poll>
}
