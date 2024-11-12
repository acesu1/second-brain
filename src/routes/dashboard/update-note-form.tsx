import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { Doc } from 'convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { LoadingButton } from '@/components/loading-button'
import { useState } from 'react'

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' })
    .max(50),
  description: z.string().min(2,
    { message: 'Description must be at least 2 characters.' })
    .max(200),
  text: z.string().min(2, { message: 'Text must be at least 2 characters.' })
    .max(1000),
})

export function UpdateNoteForm({
  note,
  onEdit,
}: {
  note: Doc<'notes'>,
  onEdit: () => void,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const updateNote = useMutation(api.notes.updateNote)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      text: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    await updateNote({
      noteId: note._id,
      title: values.title,
      description: values.description,
      text: values.text,
    })

    onEdit()
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
        <LoadingButton
          isLoading={isLoading}
          loadingText="Updating..."

        >
          Update
        </LoadingButton>
      </form>
    </Form>
  )
}
