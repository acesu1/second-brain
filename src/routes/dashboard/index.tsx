import { api } from '../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { NoteCard } from './note-card'
import { CreateNoteButton } from './create-note-button'

export function Dashboard() {
  const notes = useQuery(api.notes.getNotes)

  return (
    <div className="space-y-16">
      <CreateNoteButton />

      <div className="grid grid-cols-4 gap-4">
        {notes?.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  )
}
