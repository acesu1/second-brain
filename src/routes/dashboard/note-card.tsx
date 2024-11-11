import { useState } from 'react'
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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { UpdateNoteForm } from './update-note-form'

export function NoteCard({ note }: { note: Doc<'notes'> }) {
  const [isOpen, setIsOpen] = useState(false)
  const deleteNote = useMutation(api.notes.deleteNote)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>{note.description}</CardDescription>
      </CardHeader>
      <CardContent>{note.text}</CardContent>
      <CardFooter className="flex gap-2">

        <Sheet onOpenChange={setIsOpen} open={isOpen}>
          <SheetTrigger asChild>
            <Button>Edit</Button>
          </SheetTrigger>
          <SheetContent className="space-y-4">
            <SheetHeader>
              <SheetTitle>Edit</SheetTitle>
              <SheetDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Beatae a distinctio ullam.
              </SheetDescription>
            </SheetHeader>

            <UpdateNoteForm onEdit={() => setIsOpen(false)} note={note} />
          </SheetContent>
        </Sheet>

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
