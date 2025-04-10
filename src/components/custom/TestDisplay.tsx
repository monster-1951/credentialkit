import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
    //   console.log(text)
    //   console.log(text.split(/(?=\d+\.\s)/g).map((point) => point.trim()))
    // console.log(text.match(/\d+\.[^]+?(?=\s\d+\.|$)/g) || []);
    return text.match(/\d+\.[^]+?(?=\s\d+\.|$)/g) || [];
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
          <Card
            key={index}
            className="p-4 space-y-4 bg-slate-900 text-white border border-zinc-700"
          >
            <CardContent>
              <div className="text-lg font-semibold text-zinc-100">
                {question}
              </div>
              <Separator className="my-2 bg-zinc-700" />

              {type === "mcq" && options && (
                <RadioGroup defaultValue={String(answer)}>
                  {options.map((option, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={`option-${index}-${i}`}
                      />
                      <label
                        htmlFor={`option-${index}-${i}`}
                        className="text-zinc-200"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                  <div className="text-zinc-400">Answer:</div>
                  <label
                    htmlFor={`option-${index}`}
                    className="text-zinc-200"
                  >
                    {answer}
                  </label>
                </RadioGroup>
              )}

              {type === "short_answer" && (
                <>
                  <div className="text-zinc-400">Answer:</div>
                  <div className="text-zinc-100">{answer}</div>
                  {keywords && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {keywords.map((keyword, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs border-zinc-600 text-zinc-300"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              )}

              {type === "long_answer" && (
                <>
                  <div className=" text-zinc-400">Answer:</div>
                  <div className="whitespace-pre-line text-zinc-100">
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
                  {key_points && (
                    <div className="mt-4 space-y-1">
                      <div className="font-medium text-zinc-200">
                        Key Points:
                      </div>
                      {key_points.map((point, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <span className="text-sm text-zinc-300">•</span>
                          <span className=" text-zinc-200">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {type === "true_false" && (
                <div className="flex items-center space-x-2">
                  <Checkbox checked={!!answer} disabled />
                  <label className="text-zinc-200">{String(answer)}</label>
                </div>
              )}

              {explanation && (
                <div className="text-sm mt-4 text-zinc-400">
                  <strong className=" text-zinc-200">Explanation:</strong>{" "}
                  {explanation}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuestionRenderer;
