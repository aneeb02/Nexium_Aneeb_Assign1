'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ThemeToggle"

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
  const [quote, setQuote] = useState('Enter a topic to get a quote!')

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
    <div className="max-w-xl mx-auto mt-20 p-6 border rounded-2xl shadow-xl 
    bg-white text-center text-black 
    dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700">
      <h1 className="text-2xl text-black font-semibold mb-4 dark:text-white">Topic-Based Quote Generator</h1>
      <Input
        placeholder="Type a topic like 'life', 'success', or 'love'"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="mb-4 bg-white text-black dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-400"
      />
      <Button
      onClick={getQuote}
      className="mb-6 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Get Quote
      </Button>
      <p className="text-lg font-medium text-black dark:text-white">{quote}</p>
    </div>
  )
}
