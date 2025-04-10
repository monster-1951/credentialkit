'use client'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from '../ui/checkbox'
import { Textarea } from '../ui/textarea'
import { N8N_WEBHOOK_URL_FOR_FORM } from '@/constants/URLs'
import { BRANCHES, COURSES } from '@/constants/CoachingCenterDetails'


const MODES = ['Online', 'Offline', 'Hybrid']

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  courses: z.array(z.string()).min(1, 'Select at least one course'),
  mode: z.enum(['Online', 'Offline', 'Hybrid']),
  city: z.enum(['ECIL , Hyderabad', 'Ameerpet , Hyderabad', 'Koti , Hyderabad']),
  goal: z.string().min(1, 'Learning goal is required'),
})

export default function LeadForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      courses: [],
      mode: 'Hybrid',
      city: 'ECIL , Hyderabad',
      goal: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = [
      {
        'What is your name': values.name,
        'What is your email?': values.email,
        'Mobile Number': Number(values.mobile),
        'Which Course you are interested in': values.courses,
        'Preferred learning mode': values.mode,
        'City/Branch': values.city,
        'Learning Goal': values.goal,
        submittedAt: new Date().toISOString(),
        formMode: 'test',
      },
    ]

    try {
      await axios.post(N8N_WEBHOOK_URL_FOR_FORM, payload)
      console.log(payload)
      toast.success('Form submitted successfully')
      form.reset()
    } catch (err) {
      toast.error('Submission failed. Try again.')
      console.error(err)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 max-w-xl mx-auto bg-[#0f0f0f] text-white rounded-2xl shadow-xl border border-[#1f1f1f]"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-[#1a1a1a] text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} className="bg-[#1a1a1a] text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mobile */}
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} className="bg-[#1a1a1a] text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Courses */}
        <FormField
          control={form.control}
          name="courses"
          render={() => (
            <FormItem>
              <FormLabel>Which Course are you interested in?</FormLabel>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {COURSES.map((course) => (
                  <FormField
                    key={course}
                    control={form.control}
                    name="courses"
                    render={({ field }) => (
                      <FormItem
                        key={course}
                        className="flex flex-row items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(course)}
                            onCheckedChange={(checked) => {
                              const updated = checked
                                ? [...field.value, course]
                                : field.value.filter((c: string) => c !== course)
                              field.onChange(updated)
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-gray-400">
                          {course}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mode */}
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Learning Mode</FormLabel>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {MODES.map((m) => (
                  <Button
                    type="button"
                    key={m}
                    variant="outline"
                    className={cn(
                      'rounded-xl px-4 py-1 text-sm',
                      field.value === m
                        ? 'bg-white text-black font-semibold'
                        : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#222]'
                    )}
                    onClick={() => field.onChange(m)}
                  >
                    {m}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City/Branch as buttons */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City/Branch</FormLabel>
              <div className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-3">
                {BRANCHES.map((b) => (
                  <Button
                    type="button"
                    key={b}
                    variant="outline"
                    className={cn(
                      'rounded-xl px-4 py-1 text-sm text-center',
                      field.value === b
                        ? 'bg-white text-black font-semibold'
                        : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#222]'
                    )}
                    onClick={() => field.onChange(b)}
                  >
                    {b}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Goal */}
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Learning Goal</FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-[#1a1a1a] text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
