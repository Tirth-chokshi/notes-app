import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/notes">Notes</Link>
        <button onClick={() => {/* implement logout */}}>Logout</button>
      </nav>
    </header>
  );
}