import { type Vote } from '@prisma/client'
import { type ICreateVoteDTO } from '../dtos/create-vote-dto'
import { type IFindVoteBySessionId } from '../dtos/find-vote-by-session-id'

export interface IVoteRepositoryContract {
  findVoteBySessionID: (data: IFindVoteBySessionId) => Promise<Vote | null>
  create: (data: ICreateVoteDTO) => Promise<Vote>
  delete: (vote_id: number) => Promise<void>
}
