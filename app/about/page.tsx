export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        About BitTrader Demo
      </h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-4">
          This is a modern Next.js application demonstrating the latest features
          and best practices for building web applications.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Features
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Next.js 14+ with App Router</li>
          <li>TypeScript for type safety</li>
          <li>Tailwind CSS for styling</li>
          <li>ESLint for code quality</li>
          <li>Modern React patterns</li>
        </ul>
      </div>
    </div>
  )
}
