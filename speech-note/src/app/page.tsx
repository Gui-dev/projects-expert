'use client'

import { v4 as uuid } from 'uuid'

import { NewNoteCard } from '@/components/new-note-card'
import { INoteProps, NoteCard } from '@/components/note-card'
import { useState } from 'react'

export default function Home() {
  const [notes, setNotes] = useState<INoteProps[]>([])

  const onNoteCreated = (content: string) => {
    const new_note: INoteProps = {
      id: uuid(),
      date: new Date(),
      content,
    }
    setNotes((prev) => [new_note, ...prev])
  }

  return (
    <div className="m-auto my-12 max-w-6xl space-y-6">
      <img src="/logo.svg" alt="Speech Note Logo" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid auto-rows-[250px] grid-cols-3 gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {notes.map((note) => {
          return <NoteCard key={String(note.id)} note={note} />
        })}
      </div>
    </div>
  )
}
