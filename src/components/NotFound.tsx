import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 py-12 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-xl shadow-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/50">
        <h1 className="mb-2 text-2xl font-semibold">Page not found</h1>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          className="inline-flex rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          to="/"
        >
          Back to Dutch IPA
        </Link>
      </div>
    </main>
  )
}
