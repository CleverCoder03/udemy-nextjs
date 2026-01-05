"use client";

import { useState } from "react";
import NotesContent from "./NotesContent";
import toast from "react-hot-toast";

const NextForm = ({ initalNotes }) => {
    const [notes, setNotes] = useState(initalNotes)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async function (e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();

      if(result.success) {
        setNotes([result.data, ...notes])
        setLoading(false);
        setTitle("");
        setContent("");
        toast.success("Notes created successfully")
      }
    } catch (error) {
      console.error("Error creating notes", error);
      toast.error("Something went wrong")
    }
  };

  return (
    <div className="mt-8">
      <div className="p-6 w-full bg-white/90 mt-5 rounded-md">
        <form
          onSubmit={createNote}
          className="flex flex-col items-center justify-center [&_div]:w-full text-black"
        >
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              className="ring-1 border border-gray-200 w-full rounded-md p-2 text-gray-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="content">Content</label>
            <textarea
              name=""
              id="content"
              className="ring-1 border border-gray-200 w-full rounded-md p-2 text-gray-700 resize-none h-[30vh]"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[crimson] py-2 px-8 rounded-md mt-2 text-white font-semibold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="mt-15">
        <NotesContent notes={notes} />
      </div>
    </div>
  );
};

export default NextForm;
