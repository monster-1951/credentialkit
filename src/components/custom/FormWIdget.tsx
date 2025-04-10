'use client'
import { FC } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const FormWidget: FC = () => {
  return (
    <Link href={"/Form"}
      className="fixed bottom-5 right-25 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
      aria-label="Enroll Now"
      onClick={() => {
        // Replace this with your actual enrollment logic
        console.log("Enroll button clicked");
      }}
    >
      <GraduationCap className="w-6 h-6" />
    </Link>
  );
};

export default FormWidget;
