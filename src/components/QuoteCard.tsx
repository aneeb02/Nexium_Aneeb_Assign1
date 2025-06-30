'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ThemeToggle"
import { motion, AnimatePresence } from 'framer-motion'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


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
    "The most important thing is to enjoy your life — to be happy — it's all that matters.",
  ],
  courage: [
    "Courage is grace under pressure.",
    "You cannot swim for new horizons until you have courage to lose sight of the shore.",
  ],
  friendship: [
    "A real friend is one who walks in when the rest of the world walks out.",
    "Friendship is the only cement that will ever hold the world together.",
  ],
  wisdom: [
    "The only true wisdom is in knowing you know nothing.",
    "Turn your wounds into wisdom.",
  ],
  perseverance: [
    "Fall seven times, stand up eight.",
    "Perseverance is not a long race; it is many short races one after another.",
  ],
  learning: [
    "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "The beautiful thing about learning is nobody can take it away from you.",
  ],
  creativity: [
    "Creativity is intelligence having fun.",
    "You can't use up creativity. The more you use, the more you have.",
  ],
}


export default function QuoteCard() {
  const [topic, setTopic] = useState('')
  const [quote, setQuote] = useState('Pick a topic to get inspired!')
  const getQuote = () => {
      const key = topic.trim().toLowerCase()
      const topicQuotes = quotes[key]

      if (!key) {
        setQuote("Please enter a topic first.")
        return
      }

      if (!topicQuotes) {
        setQuote("Sorry, we don't have quotes on that topic yet.")
        return
      }

      const random = topicQuotes[Math.floor(Math.random() * topicQuotes.length)]
      setQuote(random)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-xl mx-auto mt-20 p-6 border rounded-2xl shadow-xl 
        transition-colors duration-500
        bg-white text-center text-black 
        dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
    >
      <h1 className="text-2xl text-black font-semibold mb-4 dark:text-white">Topic-Based Quote Generator</h1>
      <Select onValueChange={setTopic}>
        <SelectTrigger className="mb-4 w-full dark:bg-zinc-700 dark:text-white">
          <SelectValue placeholder="Choose a topic" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(quotes).map((key) => (
            <SelectItem key={key} value={key} className="capitalize">
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <motion.button
  whileTap={{ scale: 0.95 }}
  onClick={getQuote}
  className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md dark:bg-blue-500 dark:hover:bg-blue-600"
>
  Get Quote
</motion.button>
      <AnimatePresence mode="wait">
  <motion.p
    key={quote}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.4 }}
    className="text-lg font-medium text-black dark:text-white"
  >
    {quote}
  </motion.p>
</AnimatePresence>
    </motion.div>
  )
}
