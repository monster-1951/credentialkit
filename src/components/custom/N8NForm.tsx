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
import { motion } from 'framer-motion'
import { GraduationCap, MapPin, MonitorSmartphone, Target } from 'lucide-react'

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
      toast.success('Form submitted successfully! We will contact you soon.', {
        position: 'top-center',
        duration: 5000,
      })
      form.reset()
    } catch (err) {
      toast.error('Submission failed. Please try again.', {
        position: 'top-center',
      })
      console.error(err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
        >
          <div className="text-center mb-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 w-full">
            <h2 className="text-3xl font-bold text-white mb-2">Enroll Now</h2>
            <p className=" text-white">Start your learning journey with us today</p>
          </div>
<hr />
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-bold text-lg">Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter your full name"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-bold text-lg">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Mobile */}
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-bold text-lg">Mobile Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    {...field}
                    className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="+91 9876543210"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Courses */}
          <FormField
            control={form.control}
            name="courses"
            render={() => (
              <FormItem>
                <FormLabel className="text-gray-900 font-bold text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  Which Course are you interested in?
                </FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {COURSES.map((course) => (
                    <FormField
                      key={course}
                      control={form.control}
                      name="courses"
                      render={({ field }) => (
                        <FormItem
                          key={course}
                          className="flex flex-row items-center space-x-3 space-y-0 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
                              className="border-gray-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">
                            {course}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Mode */}
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-bold text-lg flex items-center gap-2">
                  <MonitorSmartphone className="h-5 w-5 text-blue-600" />
                  Preferred Learning Mode
                </FormLabel>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {MODES.map((m) => (
                    <motion.div
                      key={m}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="button"
                        key={m}
                        variant="outline"
                        className={cn(
                          'rounded-lg px-4 py-3 text-sm h-auto',
                          field.value === m
                            ? 'bg-indigo-100 border-indigo-500 text-indigo-700 font-semibold'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        )}
                        onClick={() => field.onChange(m)}
                      >
                        {m}
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* City/Branch as buttons */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-bold text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  Select Your Nearest Branch
                </FormLabel>
                <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-3">
                  {BRANCHES.map((b) => (
                    <motion.div
                      key={b}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="button"
                        key={b}
                        variant="outline"
                        className={cn(
                          'rounded-lg px-4 py-3 text-sm h-auto',
                          field.value === b
                            ? 'bg-amber-100 border-amber-500 text-amber-700 font-semibold'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        )}
                        onClick={() => field.onChange(b)}
                      >
                        {b}
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Goal */}
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-bold text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Your Learning Goal
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="bg-gray-50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 min-h-[120px]"
                    placeholder="Describe what you want to achieve..."
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg font-semibold shadow-lg"
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit Application'
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}