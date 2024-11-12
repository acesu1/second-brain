import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import type { Doc } from 'convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { LoadingButton } from '@/components/loading-button'
import { UpdateNoteButton } from './update-note-button'
import { Trash2 } from 'lucide-react'

export function NoteCard({ note }: { note: Doc<'notes'> }) {
  const [isLoading, setIsLoading] = useState(false)
  const deleteNote = useMutation(api.notes.deleteNote)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>{note.description}</CardDescription>
      </CardHeader>
      <CardContent>{note.text}</CardContent>
      <CardFooter className="flex gap-2">
        <UpdateNoteButton note={note} />
        <LoadingButton
          isLoading={isLoading}
          loadingText="Deleting..."
          variant="destructive"
          onClick={() => {
            setIsLoading(true)
            deleteNote({ noteId: note._id })
          }}
        >
          <Trash2 />
          Delete
        </LoadingButton>
      </CardFooter>
    </Card>
  )
}
