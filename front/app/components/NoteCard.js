import Link from 'next/link';

export default function NoteCard({ note }) {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body.substring(0, 100)}...</p>
      <Link href={`/notes/${note._id}`}>View</Link>
    </div>
  );
}