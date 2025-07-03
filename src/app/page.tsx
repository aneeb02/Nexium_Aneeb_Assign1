import QuoteCard from "@/components/QuoteCard"
import ThemeToggle from "@/components/ThemeToggle"

export default function Home() {
  return (
    <main className="min-h-screen w-full  text-black dark:text-white transition-colors duration-500">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 h-full min-h-screen">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Left side */}
        <div className="flex flex-col justify-center bg-[#d9b56c] items-center px-8 text-left">
          <div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight font-serif">
              QUOTE<br />GENERATOR
            </h1>
            <p className="text-lg mt-6 font-medium">
              hehe
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-center p-8 ">
          <QuoteCard />
        </div>
      </div>
    </main>
  )
}
