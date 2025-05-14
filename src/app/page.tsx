'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, BrainCircuit, GraduationCap, Rocket, ShieldCheck, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { company_address, company_email, company_name, company_phone, contact } from '@/constants/CoachingCenterDetails'
import { N8N } from '@/components/custom/N8N'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EduGenius AI
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium">
              Home
            </Link>
            <Link href="/quiz-generator" className="text-gray-700 hover:text-indigo-600 font-medium">
              Quiz Generator
            </Link>
            <Link href="/enroll" className="text-gray-700 hover:text-indigo-600 font-medium">
              Enrollment
            </Link>
          </nav>
          <Button asChild className="hidden md:flex">
            <Link href="/enroll">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
              AI-Powered Education
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Coaching Center <br />
              With <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Technology</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Discover how artificial intelligence can automate your teaching processes, 
              engage students better, and grow your business exponentially.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="px-8 py-6 text-lg">
                <Link href="/quiz-generator">Try Quiz Generator</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg">
                <Link href="/enroll">Demo Enrollment</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI Solutions for Coaching Centers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore how EduGenius AI can revolutionize your teaching methodology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Coaching Center?
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10">
              Experience the power of AI in education with our demo tools today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="px-8 py-6 text-lg bg-white text-indigo-600 hover:bg-gray-100">
                <Link href="/quiz-generator">Try Quiz Generator</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-black hover:bg-white/10">
                <Link href="/enroll">Demo Enrollment Form</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">EduGenius AI</h3>
              <p className="mb-4">
                AI-powered solutions for modern coaching centers to enhance teaching and learning experiences.
              </p>
              <div className="flex gap-4">
                {/* Social icons would go here */}
              </div>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/quiz-generator" className="hover:text-white">Quiz Generator</Link></li>
                <li><Link href="/enroll" className="hover:text-white">Enrollment Form</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">AI Quiz Generation</Link></li>
                <li><Link href="#" className="hover:text-white">Smart Enrollment</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic">
                <p className="mb-2">{company_name}</p>
                <p className="mb-2">{company_address}</p>
                <p className="mb-2">Email: {company_email}</p>
                <p className="mb-2">Phone: {company_phone}</p>
                <p>Developer: {contact}</p>
              </address>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} EduGenius AI by {company_name}. All rights reserved.</p>
          </div>
        </div>
      
      </footer>
    </div>
  )
}

const features = [
  {
    icon: BookOpen,
    title: "Instant Quiz Generation",
    description: "Create customized quizzes in seconds with AI based on any topic, difficulty level, and question format."
  },
  {
    icon: Users,
    title: "Smart Enrollment System",
    description: "Automate student onboarding with intelligent forms that capture all necessary details efficiently."
  },
{
    icon: BrainCircuit,
    title: "Chat Assistant",
    description: "Free up your time from answering repetitive student inquires and focus on what requires more productivity"
  }
]