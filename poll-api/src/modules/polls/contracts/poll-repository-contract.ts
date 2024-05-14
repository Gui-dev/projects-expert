import { type Poll } from '@prisma/client'

export interface IPollRepositoryContract {
  create: (title: string) => Promise<Poll>
}
