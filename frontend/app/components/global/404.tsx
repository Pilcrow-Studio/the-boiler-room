export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen">
      <p className="text-mono text-xs border border-primary rounded-full px-2 py-1 mb-8">404</p>
      <h1 className="text-4xl font-bold mb-2">Page not found</h1>
      <p className="mb-6">The page you are looking for does not exist.</p>
      <a className="underline" href="/">
        Go to home
      </a>
    </div>
  )
}
