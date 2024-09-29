// app/notes/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { findNoteById, updateNote, deleteNote } from '@/app/lib/api';

export default function NotePage({ params }) {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const data = await findNoteById(params.id);
      setNote(data.note);
      setTitle(data.note.title);
      setBody(data.note.body);
    } catch (err) {
      setError('Failed to fetch note');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await updateNote(params.id, title, body);
      router.push('/notes');
    } catch (err) {
      setError('Failed to update note');
    }
  };

  const handleDelete = async () => {
    setError('');
    try {
      await deleteNote(params.id);
      router.push('/notes');
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Note</h1>

      <form onSubmit={handleUpdate} className="mb-8">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 mb-2 border rounded"
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-3 py-2 mb-2 border rounded"
          required
        ></textarea>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Note
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Note
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
    </div>
  );
}