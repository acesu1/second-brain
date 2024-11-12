import { api } from '../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { NoteCard } from './note-card'
import { CreateNoteButton } from './create-note-button'
import { SearchNoteInput } from '@/components/header/search-note-input'
import { useState } from 'react'

export function Dashboard() {
  const notes = useQuery(api.notes.getNotes)
  const [filter, setFilter] = useState('')

  const handleSearchNote = (note: string) => {
    setFilter(note)
  }

  const filteredNotes = notes?.filter((note) =>
    note.title.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between">
        <CreateNoteButton />
        <SearchNoteInput onSearchNote={handleSearchNote} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredNotes?.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  )
}
