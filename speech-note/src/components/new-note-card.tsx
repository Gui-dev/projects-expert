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

// eslint-disable-next-line no-undef
let speechRecognition: SpeechRecognition | null = null

export const NewNoteCard = ({ onNoteCreated }: INewNoteCard) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
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
    if (content.length <= 3) {
      toast.info('Digite ou fale alguma coisa')
      return
    }
    onNoteCreated(content)
    toast.success('Nota criada com sucesso')
    setContent('')
    setShouldShowOnboarding(true)
  }

  const handleStartRecording = () => {
    const isPeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    if (!isPeechRecognitionAPIAvailable) {
      setIsRecording(false)
      return alert(
        'Infelizmente seu navegador não suporta a API de gravação!!!',
      )
    }
    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition
    speechRecognition = new SpeechRecognitionAPI()
    console.log(speechRecognition)
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true
    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')
      setContent(transcription)
    }
    speechRecognition.onerror = (event) => {
      setIsRecording(false)
      alert('Infelizmente seu navegador não suporta a API de gravação!!!')
    }
    speechRecognition.start()
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (speechRecognition) {
      speechRecognition.stop()
    }
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
        <DialogContent className="md-left-1/2 flex h-full w-full flex-col border border-slate-500 bg-slate-700 md:top-1/2 md:h-[60vh] md:max-w-[640px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md">
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
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:text-lime-500"
                    onClick={handleStartRecording}
                  >
                    gravando uma nota
                  </button>{' '}
                  em áudio ou se preferir{' '}
                  <button
                    type="button"
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
            {isRecording && (
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 py-4 text-center text-sm font-medium text-slate-300 outline-none transition-colors hover:text-slate-100"
                onClick={handleStopRecording}
              >
                <div className="size-3 animate-pulse rounded-full bg-red-500" />
                Gravando... (clicque p/ interromper)
              </button>
            )}

            {!isRecording && (
              <button
                type="submit"
                className="w-full rounded-md bg-lime-400 py-4 text-center text-sm font-medium text-slate-950 outline-none transition-colors hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
