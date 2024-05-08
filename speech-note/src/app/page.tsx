/* eslint-disable prettier/prettier */
'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { NewNoteCard } from '@/components/new-note-card'
import { INoteProps, NoteCard } from '@/components/note-card'

export default function Home() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<INoteProps[]>([])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearch(query)
  }

  const filtered_notes =
    search !== ''
      ? notes.filter((note) =>
        note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      )
      : notes

  const onNoteCreated = (content: string) => {
    const new_note: INoteProps = {
      id: uuid(),
      date: new Date(),
      content,
    }
    setNotes((prev) => [new_note, ...prev])
    localStorage.setItem('notes', JSON.stringify([new_note, ...notes]))
  }

  const onNoteDeleted = (id: string) => {
    const filtered_notes = notes.filter(note => note.id !== id)
    setNotes(filtered_notes)
    localStorage.setItem('notes', JSON.stringify(filtered_notes))
  }

  useEffect(() => {
    const notes_on_storage = localStorage.getItem('notes')
    if (notes_on_storage) {
      setNotes(JSON.parse(notes_on_storage))
    }
  }, [])

  return (
    <div className="m-auto my-12 max-w-6xl space-y-6 px-5">
      <img src="/logo.svg" alt="Speech Note Logo" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          value={search}
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />
      <div className="grid auto-rows-[250px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filtered_notes.map((note) => {
          return <NoteCard key={String(note.id)} note={note} onNoteDeleted={onNoteDeleted} />
        })}
      </div>
    </div>
  )
}
