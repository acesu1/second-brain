import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CreateNoteForm } from './create-note-form'
import { PlusCircle } from 'lucide-react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

export function CreateNoteButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle />
          New Note
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Create note</SheetTitle>
          <SheetDescription>
            Add details to your note so you can easily find it later.
          </SheetDescription>
        </SheetHeader>
        <CreateNoteForm onCreate={() => {
          setIsOpen(false)
          toast({
            description: 'Note created successfully!',
          })
        }}
        />
      </SheetContent>
      <Toaster />
    </Sheet>
  )
}
