import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { UpdateNoteForm } from './update-note-form'
import { useState } from 'react'
import type { Doc } from 'convex/_generated/dataModel'

export function UpdateNoteButton({ note }:{ note: Doc<'notes'> }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button>
          <Pencil />
          Edit
        </Button>
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
  )
}
