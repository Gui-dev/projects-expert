import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogPortal,
} from '@/components/ui/dialog'

export interface INoteProps {
  id: string
  date: Date
  content: string
}

interface INoteCard {
  note: INoteProps
}

export const NoteCard = ({ note }: INoteCard) => {
  return (
    <Dialog>
      <DialogTrigger className="relative flex flex-col gap-3 overflow-hidden rounded-md bg-slate-800 p-5 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="fixed flex h-full w-full flex-col border border-slate-500 bg-slate-700 md:h-[60vh] md:max-w-[640px] md:rounded-md">
          <div className="flex flex-1 flex-col gap-3">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <DialogFooter>
            <button
              type="button"
              className="group w-full rounded-md bg-slate-800 py-4 text-center text-sm font-medium text-slate-300 outline-none"
            >
              Deseja{' '}
              <span className="text-red-400 group-hover:underline">
                apagar essa nota
              </span>{' '}
              ?
            </button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
