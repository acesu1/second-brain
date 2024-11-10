import { Button } from '@/components/ui/button'
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
import { useMutation } from 'convex/react'
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

export function CreateNoteForm({ onCreate }:{ onCreate: () => void }) {
  const createNote = useMutation(api.notes.createNote)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      text: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createNote({
      title: values.title,
      description: values.description,
      text: values.text,
    })

    onCreate()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
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
                <Input {...field} autoComplete="off" />
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
  )
}
