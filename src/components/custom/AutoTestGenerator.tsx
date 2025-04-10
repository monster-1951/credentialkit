"use client";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { AUTOTESTGENERATOR_WEBHOOK_URL } from "@/constants/URLs";

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
  "Your Mail ID": z.string().email(),
});

type FormData = z.infer<typeof formSchema>;

export default function AutoTestGenerator() {
  const [response, setResponse] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "Subject/Topic": "",
      "Number of Questions": 5,
      "Difficulty Level": "Moderate",
      "Question Format":
        "Mixed of Short Answers, Long Answers, True/False, MCQ",
      "Your Mail ID": "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setGenerating(true);
    try {
      const res = await axios.post(AUTOTESTGENERATOR_WEBHOOK_URL, data);
      console.log(res.data);
      setResponse(JSON.parse(res.data.output));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10">
      <Card className="max-w-3xl mx-auto bg-zinc-900 text-white shadow-xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6">
            Generate Quiz Questions
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="Subject/Topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject or Topic</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Bipolar Junction Transistors"
                        {...field}
                      />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mixed of Short Answers, Long Answers, True/False, MCQ">
                          Mixed
                        </SelectItem>
                        <SelectItem value="MCQ">MCQ</SelectItem>
                        <SelectItem value="True/False">True/False</SelectItem>
                        <SelectItem value="Long Answers">
                          Long Answers
                        </SelectItem>
                        <SelectItem value="Short Answers">
                          Short Answers
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Your Mail ID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email ID</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={generating}>
                {generating ? "Generating..." : "Generate"}
              </Button>
            </form>
          </Form>

          {/* {response.length > 0 && (
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold">Generated Questions:</h3>
              {response.map((item, index) => (
                <div key={index} className="bg-zinc-800 p-4 rounded-xl shadow">
                  <p className="text-sm text-zinc-400 mb-1">
                    Type: {item.type}
                  </p>
                  <p className="text-lg font-medium">
                    {item.question}
                  </p>
                  {item.type === "mcq" && (
                    <ul className="list-disc ml-5 mt-2">
                      {item.options.map((opt: string, i: number) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  )}
                  {item.answer !== undefined && (
                    <p className="mt-2 text-green-400">
                      Answer: {String(item.answer)}
                    </p>
                  )}
                  {item.explanation && (
                    <p className="text-sm text-zinc-300 mt-1">
                      Explanation: {item.explanation}
                    </p>
                  )}
                  {item.keywords && (
                    <p className="text-sm text-zinc-300 mt-1">
                      Keywords: {item.keywords.join(", ")}
                    </p>
                  )}
                  {item.key_points && (
                    <p className="text-sm text-zinc-300 mt-1">
                      Key Points: {item.key_points.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )} */}

          {response.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-xl shadow space-y-2"
            >
              <p className="text-sm text-zinc-400">Type: {item.type}</p>
              <p className="text-lg font-semibold">{item.question}</p>

              {item.type === "mcq" && (
                <>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    {item.options.map((opt: string, idx: number) => (
                      <li key={idx}>{opt}</li>
                    ))}
                  </ul>
                  <p className="text-green-400">Answer: {item.answer}</p>
                  <p className="text-sm text-zinc-400">{item.explanation}</p>
                </>
              )}

              {item.type === "short_answer" && (
                <>
                  <p className="text-green-400">Answer: {item.answer}</p>
                  {item.keywords && (
                    <p className="text-sm text-zinc-400">
                      Keywords: {item.keywords.join(", ")}
                    </p>
                  )}
                </>
              )}

              {item.type === "long_answer" && (
                <>
                  <p className="text-green-400">Answer:</p>
                  <ul className="list-decimal list-inside space-y-1">
                    {item.answer
                      .split(/\d+\.\s+/)
                      .filter(Boolean)
                      .map((point: string, idx: number) => (
                        <li key={idx}>{point.trim()}</li>
                      ))}
                  </ul>
                  {item.key_points && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-zinc-300">
                        Key Points:
                      </p>
                      <ul className="list-disc list-inside ml-4 text-sm text-zinc-400 space-y-1">
                        {item.key_points.map((kp: string, kpIndex: number) => (
                          <li key={kpIndex}>{kp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              {item.type === "true_false" && (
                <>
                  <p className="text-green-400">
                    Answer: {item.answer ? "True" : "False"}
                  </p>
                  <p className="text-sm text-zinc-400">{item.explanation}</p>
                </>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
