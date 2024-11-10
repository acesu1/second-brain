import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import { PlusCircle, Trash2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent, CardFooter,
} from '@/components/ui/card'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' })
    .max(50),
  description: z.string().min(2,
    { message: 'Description must be at least 2 characters.' })
    .max(200),
  text: z.string().min(2, { message: 'Text must be at least 2 characters.' })
    .max(1000),
})

export function Dashboard() {
  const createNote = useMutation(api.notes.createNote)
  const notes = useQuery(api.notes.getNotes)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      text: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await createNote({
      title: values.title,
      description: values.description,
      text: values.text,
    })
  }

  return (
    <div className="space-y-16">
      <Sheet>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      The description serves to remind you why you created the
                      note.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
      <div className="grid grid-cols-4 gap-4">
        {notes?.map((note) => (
          <Card key={note._id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
              <CardDescription>{note.description}</CardDescription>
            </CardHeader>
            <CardContent>{note.text}</CardContent>
            <CardFooter>
              <Button variant="destructive">
                <Trash2 />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
