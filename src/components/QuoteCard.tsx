'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const quotes: Record<string, string[]> = {
  life: [
    "Life is what happens when you're busy making other plans.",
    "To live is the rarest thing in the world. Most people exist, that is all.",
  ],
  success: [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The road to success is always under construction.",
  ],
  love: [
    "Love all, trust a few, do wrong to none.",
    "To love and be loved is to feel the sun from both sides.",
  ],
  happiness: [
    "Happiness depends upon ourselves.",
    "Enjoy your life — be happy — that's all that matters.",
  ],
  courage: [
    "Courage is grace under pressure.",
    "You can't swim for new horizons without courage to lose sight of the shore.",
  ],
  friendship: [
    "A real friend walks in when the rest of the world walks out.",
    "Friendship is the only cement that will ever hold the world together.",
  ],
  wisdom: [
    "The only true wisdom is in knowing you know nothing.",
    "Turn your wounds into wisdom.",
  ],
  perseverance: [
    "Fall seven times, stand up eight.",
    "Perseverance is not a long race; it's many short races in a row.",
  ],
  learning: [
    "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "The beautiful thing about learning is nobody can take it away from you.",
  ],
  creativity: [
    "Creativity is intelligence having fun.",
    "The more you use creativity, the more you have.",
  ],
}

const formSchema = z.object({
  topic: z.string().min(1, "Please select a topic."),
})

export default function QuoteCard() {
  const [quote, setQuote] = useState('Pick a topic to get inspired!')

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "" },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const selectedQuotes = quotes[values.topic]
    if (!selectedQuotes) {
      setQuote("No quotes available for that topic.")
      return
    }
    const random = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)]
    setQuote(random)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md p-6 border border-zinc-200 rounded-2xl shadow-lg 
      text-center bg-[#fff0d3] text-[#e2a429] dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
    >
      <h1 className="text-2xl font-semibold mb-6">Quote Generator</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a Topic</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full dark:bg-zinc-700 dark:text-white">
                      <SelectValue placeholder="Choose one..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(quotes).map((topic) => (
                        <SelectItem key={topic} value={topic} className="capitalize">
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-[#fac65f] dark:bg-[#b39353] hover:bg-yellow-400 text-black mt-4">
            Get Quote
          </Button>
        </form>
      </Form>

      <AnimatePresence mode="wait">
        <motion.p
          key={quote}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="mt-6 text-lg font-medium text-black dark:text-white"
        >
          {quote}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}
