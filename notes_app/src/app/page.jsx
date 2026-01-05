import NextForm from "@/components/NextForm";
import dbConnect from "@/lib/db";
import Note from "@/models/Note";

export async function getNotes() {
  await dbConnect();

  const notes = await Note.find().sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
  }));
}

export default async function Home() {
  const notes = await getNotes();

  return (
    <div className="flex flex-col my-20 items-center justify-center font-sans">
      <div>
        <h1 className="text-4xl text-center font-semibold">Notes App</h1>
        <NextForm initalNotes={notes} />
      </div>
    </div>
  );
}
