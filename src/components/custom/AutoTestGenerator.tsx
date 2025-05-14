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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AUTOTESTGENERATOR_WEBHOOK_URL } from "@/constants/URLs";
import QuestionRenderer from "./TestDisplay";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  "Subject/Topic": z.string().min(1),
  "Number of Questions": z.coerce.number().min(1).max(30),
  "Difficulty Level": z.enum(["High", "Moderate", "Easy"]),
  "Question Format": z.enum([
    "Mixed of Short Answers, Long Answers, True/False, MCQ",
    "MCQ",
    "True/False",
    "Short Answers",
  ]),
  "Your Mail ID": z.string().email(),
});

type FormData = z.infer<typeof formSchema>;

export default function AutoTestGenerator() {
  const [response, setResponse] = useState<any[]>([
    {
        "json": {
            "type": "mcq",
            "question": "1. Which of the following statements is a direct consequence of the Second Law of Thermodynamics?",
            "options": [
                "A) A refrigerator can heat up its surroundings.",
                "B) A heat engine can convert all of its input heat into useful work.",
                "C) Total entropy always increases in a closed system.",
                "D) A heat engine can run indefinitely without any external input of energy."
            ],
            "answer": "C) Total entropy always increases in a closed system.",
            "explanation": "The Second Law of Thermodynamics states that the total entropy of a closed system will always increase over time, except in reversible processes."
        }
    },
    {
        "json": {
            "type": "mcq",
            "question": "2. What is the primary purpose of the Carnot cycle in the context of the Second Law of Thermodynamics?",
            "options": [
                "A) To demonstrate the efficiency of a heat engine.",
                "B) To prove the existence of the Second Law.",
                "C) To derive the fundamental equation for the entropy change in a system.",
                "D) To show that a heat engine can operate in reverse."
            ],
            "answer": "A) To demonstrate the efficiency of a heat engine.",
            "explanation": "The Carnot cycle is a hypothetical cycle that helps to illustrate the maximum possible efficiency of a heat engine, as derived from the Second Law of Thermodynamics."
        }
    },
    {
        "json": {
            "type": "mcq",
            "question": "3. Which of the following statements is a characteristic of the Third Law of Thermodynamics?",
            "options": [
                "A) It describes the behavior of systems at absolute zero.",
                "B) It discusses the concept of entropy.",
                "C) It deals with the efficiency of heat engines.",
                "D) It explains the behavior of gases at high temperatures."
            ],
            "answer": "A) It describes the behavior of systems at absolute zero.",
            "explanation": "The Third Law of Thermodynamics states that as the temperature of a system approaches absolute zero, its entropy approaches a minimum value."
        }
    },
    {
        "json": {
            "type": "mcq",
            "question": "4. Which of the following is NOT a type of thermodynamic process?",
            "options": [
                "A) Isothermal process",
                "B) Adiabatic process",
                "C) Isobaric process",
                "D) Electrical process"
            ],
            "answer": "D) Electrical process",
            "explanation": "Thermodynamic processes refer to the changes in the state of a system that involve heat transfer, work, or changes in the number of particles. Electrical processes are not a type of thermodynamic process."
        }
    },
    {
        "json": {
            "type": "mcq",
            "question": "5. Which of the following statements is a consequence of the Zeroth Law of Thermodynamics?",
            "options": [
                "A) If two systems are in thermal equilibrium with a third system, then they are also in thermal equilibrium with each other.",
                "B) If two systems are not in thermal equilibrium, then they can never be made to be in thermal equilibrium.",
                "C) The temperature of a system is a measure of its internal energy.",
                "D) The temperature of a system is a measure of its entropy."
            ],
            "answer": "A) If two systems are in thermal equilibrium with a third system, then they are also in thermal equilibrium with each other.",
            "explanation": "The Zeroth Law of Thermodynamics states that if two systems are in thermal equilibrium with a third system, then they are also in thermal equilibrium with each other."
        }
    }
]);
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
      console.log(res)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <CardHeader className="p-0">
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8" />
                <div>
                  <h1 className="text-3xl font-bold">Quiz Wizard</h1>
                  <p className="text-indigo-100">
                    Generate custom quizzes in seconds with AI
                  </p>
                </div>
              </div>
            </CardHeader>
          </div>
          
          <CardContent className="p-6 bg-white">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="Subject/Topic"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-gray-700 font-medium">
                          Subject or Topic
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Laws of Thermodynamics"
                            {...field}
                            className="min-h-[100px] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Number of Questions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Number of Questions
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Difficulty Level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Difficulty Level
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-gray-200 shadow-lg">
                            <SelectItem
                              value="Easy"
                              className="hover:bg-indigo-50 focus:bg-indigo-50"
                            >
                              Easy
                            </SelectItem>
                            <SelectItem
                              value="Moderate"
                              className="hover:bg-indigo-50 focus:bg-indigo-50"
                            >
                              Moderate
                            </SelectItem>
                            <SelectItem
                              value="High"
                              className="hover:bg-indigo-50 focus:bg-indigo-50"
                            >
                              High
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Question Format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Question Format
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-gray-200 shadow-lg">
                            <SelectItem
                              value="Mixed of Short Answers, Long Answers, True/False, MCQ"
                              className="hover:bg-indigo-50 focus:bg-indigo-50"
                            >
                              Mixed Format
                            </SelectItem>
                            <SelectItem
                              value="MCQ"
                              className="hover:bg-indigo-50 focus:bg-indigo-50"
                            >
                              Multiple Choice
                            </SelectItem>
                            <SelectItem
                              value="True/False"
                              className="hover:bg-indigo-50 focus:bg-indigo-50"
                            >
                              True/False
                            </SelectItem>
                            <SelectItem
                              value="Short Answers"
                              className="hover:bg-indigo-50 focus:bg-indigo-50"
                            >
                              Short Answers
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Your Mail ID"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-gray-700 font-medium">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg font-semibold shadow-lg"
                    disabled={generating}
                  >
                    {generating ? (
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
                        Generating Magic...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Generate Quiz
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Link href="/Chat">
            <Button className="bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 shadow-sm">
              Need Help? Chat with AI
            </Button>
          </Link>
        </div>

        {response.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <QuestionRenderer data={response} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}