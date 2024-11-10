import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Doc } from 'convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export function NoteCard({ note }: { note: Doc<'notes'> }) {
  const deleteNote = useMutation(api.notes.deleteNote)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>{note.description}</CardDescription>
      </CardHeader>
      <CardContent>{note.text}</CardContent>
      <CardFooter>
        <Button
          variant="destructive" onClick={() => {
            deleteNote({ noteId: note._id })
          }}
        >
          <Trash2 />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
