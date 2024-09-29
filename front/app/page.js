import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Welcome to Notes App</h1>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
    </main>
  )
}