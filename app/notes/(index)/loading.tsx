/**
 * Deliberately scoped to the (index) route group rather than sitting at
 * app/notes/loading.tsx.
 *
 * A loading boundary placed on the /notes segment would also wrap
 * /notes/[slug]. Streaming flushes the HTTP status with the first chunk, so a
 * notFound() raised further down would arrive after a 200 had already gone out
 * and the "not found" page would be served with the wrong status code. Inside
 * the group the boundary covers the index only, which never calls notFound().
 */
export default function NotesIndexLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 pt-16 pb-24 sm:px-8 sm:pt-24">
      <div className="h-5 w-40 rounded bg-paper-alt" />
      <div className="mt-8 h-10 w-72 rounded bg-paper-alt" />
      <div className="mt-4 h-5 w-full max-w-xl rounded bg-paper-alt" />
      <ul className="mt-12 space-y-4">
        {[0, 1].map((i) => (
          <li key={i} className="rounded-lg border border-rule p-5">
            <div className="h-3 w-24 rounded bg-paper-alt" />
            <div className="mt-3 h-6 w-3/4 rounded bg-paper-alt" />
            <div className="mt-3 h-4 w-full rounded bg-paper-alt" />
          </li>
        ))}
      </ul>
      <span className="sr-only" role="status">
        Loading notes
      </span>
    </main>
  )
}
