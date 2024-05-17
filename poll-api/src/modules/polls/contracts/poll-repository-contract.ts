import { type Poll } from '@prisma/client'
import { type ICreatePollDTO } from '../dtos/create-poll-dto'
import { type GetPollResponseValidation } from '../validations/get-poll-validation'

export interface IPollRepositoryContract {
  create: (data: ICreatePollDTO) => Promise<Poll>
  findPollById: (id: string) => Promise<GetPollResponseValidation | null>
}
