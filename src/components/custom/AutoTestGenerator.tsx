'use client'
import axios from "axios"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { AUTOTESTGENERATOR_WEBHOOK_URL } from "@/constants/URLs"

const formSchema = z.object({
  "Subject/Topic": z.string().min(1),
  "Number of Questions": z.coerce.number().min(1),
  "Difficulty Level": z.enum(["High", "Moderate", "Easy"]),
  "Question Format": z.enum([
    "Mixed of Short Answers, Long Answers, True/False, MCQ",
    "MCQ",
    "True/False",
    "Long Answers",
    "Short Answers",
  ]),
})

type FormData = z.infer<typeof formSchema>

export default function QuizForm() {
  const [response, setResponse] = useState<any[]>([])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "Subject/Topic": "",
      "Number of Questions": 5,
      "Difficulty Level": "Moderate",
      "Question Format": "Mixed of Short Answers, Long Answers, True/False, MCQ",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post(AUTOTESTGENERATOR_WEBHOOK_URL, data)
      console.log(res.data)
      setResponse(JSON.parse(res.data.output))
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10">
      <Card className="max-w-3xl mx-auto bg-zinc-900 text-white shadow-xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6">Generate Quiz Questions</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="Subject/Topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject or Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bipolar Junction Transistors" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Number of Questions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Difficulty Level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Question Format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Format</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mixed of Short Answers, Long Answers, True/False, MCQ">Mixed</SelectItem>
                        <SelectItem value="MCQ">MCQ</SelectItem>
                        <SelectItem value="True/False">True/False</SelectItem>
                        <SelectItem value="Long Answers">Long Answers</SelectItem>
                        <SelectItem value="Short Answers">Short Answers</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Generate</Button>
            </form>
          </Form>

          {response.length > 0 && (
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold">Generated Questions:</h3>
              {response.map((item, index) => (
                <div key={index} className="bg-zinc-800 p-4 rounded-xl shadow">
                  <p className="text-sm text-zinc-400 mb-1">Type: {item.type}</p>
                  <p className="text-lg font-medium">Q{index + 1}. {item.question}</p>
                  {item.type === "mcq" && (
                    <ul className="list-disc ml-5 mt-2">
                      {item.options.map((opt: string, i: number) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  )}
                  {item.answer !== undefined && (
                    <p className="mt-2 text-green-400">Answer: {String(item.answer)}</p>
                  )}
                  {item.explanation && (
                    <p className="text-sm text-zinc-300 mt-1">Explanation: {item.explanation}</p>
                  )}
                  {item.keywords && (
                    <p className="text-sm text-zinc-300 mt-1">Keywords: {item.keywords.join(", ")}</p>
                  )}
                  {item.key_points && (
                    <p className="text-sm text-zinc-300 mt-1">Key Points: {item.key_points.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
