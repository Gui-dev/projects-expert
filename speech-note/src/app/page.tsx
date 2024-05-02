import { NewNoteCard } from '@/components/new-note-card'
import { NoteCard } from '@/components/note-card'

export default function Home() {
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
        <NewNoteCard />

        <NoteCard />
        <NoteCard />
      </div>
    </div>
  )
}
