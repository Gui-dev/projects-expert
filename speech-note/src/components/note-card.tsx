export const NoteCard = () => {
  return (
    <button className="relative space-y-3 overflow-hidden rounded-md bg-slate-800 p-5 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-300">há 4 dias</span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit
        fugiat ducimus nulla quae aut, molestiae consequatur dignissimos saepe
        ipsa sapiente praesentium id cum optio perferendis corrupti atque
        numquam? Alias, non!
      </p>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
    </button>
  )
}
