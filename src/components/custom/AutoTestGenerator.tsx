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
import QuestionRenderer from "./TestDisplay";
import Link from "next/link";

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
  const [error, setError] = useState("");
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "Subject/Topic": "",
      "Number of Questions": 5,
      "Difficulty Level": "Moderate",
      "Question Format": "MCQ",
      "Your Mail ID": "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setGenerating(true);
    setError("");
    try {
      const res = await axios.post(AUTOTESTGENERATOR_WEBHOOK_URL, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(res);
      if (Array.isArray(res.data)) {
        setResponse(res.data);
      } else {
        setError("Invalid response format received.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("There was an error generating the questions. Try again.");
    } finally {
      setGenerating(false);
    }
  };

  

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
                      <Textarea placeholder="e.g., Laws of Thermodynamics" {...field} />
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
                       {/*  <SelectItem value="Long Answers">Long Answers</SelectItem> */}
                        <SelectItem value="Short Answers">Short Answers</SelectItem>
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
                      <Input type="email" placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer" disabled={generating}>
                {generating ? "Generating..." : "Generate"}
              </Button>
            </form>
          </Form>

        </CardContent>
      </Card>
      <Link href={'/Chat'} className="w-full mx-auto rounded-md flex justify-end p-3"><Button className="bg-white text-black">Chat</Button></Link>
        {response && <QuestionRenderer data={response} />}
    </div>
  );
}
