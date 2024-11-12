import { Input } from '../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  textFilter: z.string(),
})

export function SearchNoteInput({
  onSearchNote,
}: {
  onSearchNote: (note: string) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textFilter: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearchNote(values.textFilter)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="textFilter"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search notes..." {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
