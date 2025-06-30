import QuoteCard from "@/components/QuoteCard"
import ThemeToggle from "@/components/ThemeToggle"


export default function Home() {
  return (
<main className="relative flex min-h-screen items-center justify-center 
  bg-gradient-to-br from-gray-100 via-white to-gray-200 
dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <ThemeToggle />
      <QuoteCard />
    </main>
  )
}