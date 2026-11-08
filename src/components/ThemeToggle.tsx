export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement
    const dark = !root.classList.contains('dark')

    root.classList.toggle('dark', dark)
    root.style.colorScheme = dark ? 'dark' : 'light'

    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      // The theme still toggles when storage is unavailable.
    }
  }

  return (
    <button
      className="cursor-pointer rounded-md p-2 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white dark:focus-visible:outline-zinc-300"
      type="button"
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      onClick={toggleTheme}
    >
      <img className="size-5 dark:hidden" src="/sun.svg" alt="" />
      <img className="hidden size-5 dark:block dark:invert" src="/moon.svg" alt="" />
    </button>
  )
}
