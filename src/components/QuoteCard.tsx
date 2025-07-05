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
    "The purpose of life is a life of purpose.",
    "In the end, it's not the years in your life that count. It's the life in your years.",
    "Life is either a daring adventure or nothing at all.",
  ],
  success: [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Don't aim for success if you want it; just do what you love and believe in.",
    "The secret of success is constancy to purpose.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "It always seems impossible until it's done.",
  ],
  love: [
    "Love all, trust a few, do wrong to none.",
    "To love and be loved is to feel the sun from both sides.",
    "Love is composed of a single soul inhabiting two bodies.",
    "Where there is love there is life.",
    "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
  ],
  happiness: [
    "Happiness depends upon ourselves.",
    "The most important thing is to enjoy your life — to be happy — it's all that matters.",
    "For every minute you are angry you lose sixty seconds of happiness.",
    "Happiness is only real when shared.",
    "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened.",
  ],
  courage: [
    "Courage is grace under pressure.",
    "You can't swim for new horizons without courage to lose sight of the shore.",
    "Fear is a reaction. Courage is a decision.",
    "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'",
    "All our dreams can come true, if we have the courage to pursue them.",
  ],
  friendship: [
    "A real friend walks in when the rest of the world walks out.",
    "Friendship is the only cement that will ever hold the world together.",
    "A friend is someone who knows all about you and still loves you.",
    "Friendship doubles your joys and divides your sorrows.",
    "True friends are never apart, maybe in distance but never in heart.",
  ],
  wisdom: [
    "The only true wisdom is in knowing you know nothing.",
    "Turn your wounds into wisdom.",
    "Knowing yourself is the beginning of all wisdom.",
    "The simple things are also the most extraordinary things.",
    "Wisdom begins in wonder.",
  ],
  perseverance: [
    "Fall seven times, stand up eight.",
    "Perseverance is not a long race; it's many short races in a row.",
    "Great works are performed not by strength but by perseverance.",
    "Energy and persistence conquer all things.",
    "A river cuts through rock, not because of its power, but because of its persistence.",
  ],
  learning: [
    "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "The beautiful thing about learning is nobody can take it away from you.",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    "Anyone who stops learning is old, whether at twenty or eighty.",
    "Learning never exhausts the mind.",
  ],
  creativity: [
    "Creativity is intelligence having fun.",
    "The more you use creativity, the more you have.",
    "You can't use up creativity. The more you use, the more you have.",
    "Every artist was first an amateur.",
    "Creativity takes courage.",
  ],
}

const formSchema = z.object({
  topic: z.string().min(1, "Please select a topic."),
})

export default function QuoteCard() {
  const [quote, setQuote] = useState('Pick a topic to get inspired!')
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [previousQuotes, setPreviousQuotes] = useState<string[]>([])


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "" },
  })

  const getRandomQuote = (list: string[], exclude: string[] = []) => {
    const filtered = list.filter(q => !exclude.includes(q))
    if (filtered.length === 0) return list[Math.floor(Math.random() * list.length)]
    return filtered[Math.floor(Math.random() * filtered.length)]
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const topic = values.topic
    const selectedQuotes = quotes[topic]
    if (!selectedQuotes) {
      setQuote("No quotes available for that topic.")
      return
    }

    const random = getRandomQuote(selectedQuotes, [])
    setQuote(random)
    setSelectedTopic(topic)
    setPreviousQuotes([random])
  }

  return (

    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-6 border rounded-2xl shadow-lg 
        text-center transition-colors duration-500
        bg-[#fff0d3] text-[#1a1a1a]
        dark:bg-[#2c2c2c] dark:text-[#fef9e7] dark:border-[#3d3d3d]"
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

            <Button
              type="submit"
              className="bg-[#fac65f] mr-10 hover:bg-[#f2b84d] text-black mt-4 dark:bg-[#aa8840] dark:hover:bg-[#b39353] duration-300 transition-transform transform hover:scale-[1.02]"
            > 
              Get Quote
          </Button>
          {selectedTopic && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const all = quotes[selectedTopic]
              const next = getRandomQuote(all, previousQuotes)
              setQuote(next)
              setPreviousQuotes(prev => [...prev, next])
            }}
            className="text-sm border bg-[#fac65f] hover:bg-[#f2b84d] text-black mt-4 dark:bg-[#aa8840] dark:hover:bg-[#b39353] transition-transform transform hover:scale-[1.02] "
          >
            Another Quote
          </Button>
        )}
        
        </form>
      </Form>

      <AnimatePresence mode="wait">
        <motion.p
            key={quote}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mt-6 text-lg font-medium font-serif transition-colors duration-500"
          >
            {quote}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}
