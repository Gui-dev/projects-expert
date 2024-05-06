'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogPortal,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface INewNoteCard {
  onNoteCreated: (content: string) => void
}

export const NewNoteCard = ({ onNoteCreated }: INewNoteCard) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')

  const handleStartEditor = () => {
    setShouldShowOnboarding(false)
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    if (event.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  const handleSaveNote = (event: FormEvent) => {
    event.preventDefault()
    onNoteCreated(content)
    toast.success('Nota criada com sucesso')
    setContent('')
    setShouldShowOnboarding(true)
  }

  return (
    <Dialog>
      <DialogTrigger className="flex flex-col gap-3 rounded-md bg-slate-700 p-5 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em aúdio que será convertida para texto automaticamente
        </p>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="flex h-[60vh] w-full max-w-[640px] flex-col rounded-md border border-slate-500 bg-slate-700">
          <form
            className="flex flex-1 flex-col justify-between"
            onSubmit={handleSaveNote}
          >
            <div className="flex flex-1 flex-col gap-3">
              <span className="text-sm font-medium text-slate-200">
                Adicionar nota
              </span>
              {shouldShowOnboarding && (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{' '}
                  <button className="font-medium text-lime-400 hover:text-lime-500">
                    gravando uma nota
                  </button>{' '}
                  em áudio ou se preferir{' '}
                  <button
                    className="font-medium text-lime-400 hover:text-lime-500"
                    onClick={handleStartEditor}
                  >
                    utilize apenas texto
                  </button>
                </p>
              )}

              {!shouldShowOnboarding && (
                <textarea
                  autoFocus
                  className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none"
                  value={content}
                  onChange={handleContentChange}
                ></textarea>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-lime-400 py-4 text-center text-sm font-medium text-slate-950 outline-none transition-colors hover:bg-lime-500"
            >
              Salvar nota
            </button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
