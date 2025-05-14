import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Lightbulb, ListChecks } from "lucide-react";

type QuestionType = {
  json: {
    type: "mcq" | "short_answer" | "long_answer" | "true_false";
    question: string;
    options?: string[];
    answer: string | boolean;
    explanation?: string;
    keywords?: string[];
    key_points?: string[];
  };
};

type Props = {
  data: QuestionType[];
};

const QuestionRenderer: React.FC<Props> = ({ data }) => {
  const splitt = (text: string) => {
    return text.match(/\d+\.[^]+?(?=\s\d+\.|$)/g) || [];
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "mcq":
        return <ListChecks className="h-5 w-5 text-indigo-600" />;
      case "short_answer":
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case "long_answer":
        return <Lightbulb className="h-5 w-5 text-amber-600" />;
      case "true_false":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {data.map((item, index) => {
        const {
          type,
          question,
          options,
          answer,
          explanation,
          keywords,
          key_points,
        } = item.json;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  {getQuestionTypeIcon(type)}
                  <div className="text-lg font-semibold text-gray-800">
                    Question {index + 1}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-gray-700">{question}</div>
                <Separator className="bg-gray-100" />

                {type === "mcq" && options && (
                  <div className="space-y-3">
                    <RadioGroup defaultValue={String(answer)}>
                      {options.map((option, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`option-${index}-${i}`}
                            className="text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor={`option-${index}-${i}`}
                            className="text-gray-700 cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-green-700">
                        Correct Answer:
                      </div>
                      <div className="text-green-800 font-medium">
                        {answer}
                      </div>
                    </div>
                  </div>
                )}

                {type === "short_answer" && (
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-700">
                        Expected Answer:
                      </div>
                      <div className="text-blue-800">{answer}</div>
                    </div>
                    {keywords && (
                      <div className="mt-2">
                        <div className="text-sm font-medium text-gray-500 mb-2">
                          Keywords to include:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {keywords.map((keyword, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {type === "long_answer" && (
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <div className="text-sm font-medium text-amber-700">
                        Model Answer:
                      </div>
                      <div className="text-amber-800 whitespace-pre-line">
                        {typeof answer === "string" &&
                          splitt(answer).map((point, index) => {
                            return (
                              <React.Fragment key={index}>
                                {point.trim()}
                                <br />
                              </React.Fragment>
                            );
                          })}
                      </div>
                    </div>
                    {key_points && (
                      <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm font-medium text-purple-700 mb-2">
                          Key Points to Cover:
                        </div>
                        <ul className="space-y-2">
                          {key_points.map((point, i) => (
                            <li
                              key={i}
                              className="flex items-start space-x-2 text-purple-800"
                            >
                              <span className="text-purple-500">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {type === "true_false" && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Checkbox
                      checked={!!answer}
                      disabled
                      className="data-[state=checked]:bg-green-600 border-gray-300"
                    />
                    <div className="text-gray-700">
                      The correct answer is{" "}
                      <span className="font-medium text-green-700">
                        {String(answer)}
                      </span>
                    </div>
                  </div>
                )}

                {explanation && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      Explanation:
                    </div>
                    <div className="text-gray-600">{explanation}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default QuestionRenderer;