"use client";

import { useState } from "react";
import NotesContent from "./NotesContent";
import toast from "react-hot-toast";

const NextForm = ({ initalNotes }) => {
  const [notes, setNotes] = useState(initalNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEdit = (note) => {
    if (loading) return;
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || loading) return;

    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();

      if (result.success) {
        setNotes((prev) => [result.data, ...prev]);
        setTitle("");
        setContent("");
        toast.success("Notes created successfully");
      } else {
        toast.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error creating notes", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (loading) return;

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setNotes((prev) => prev.filter((note) => note._id !== id));
        toast.success("Notes deleted successfully");
      } else {
        toast.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Delete error", error);
      toast.error("Error deleting notes");
    }
  };

  const updateNote = async (id) => {
    if (!editTitle.trim() || !editContent.trim() || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setNotes((prev) =>
          prev.map((note) => (note._id === id ? result.data : note))
        );
        cancelEdit();
        toast.success("Notes updated successfully");
      } else {
        toast.error("Failed to update note");
      }
    } catch (error) {
      console.error("Update error", error);
      toast.error("Error updating the notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {/* Create Note */}
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
              id="content"
              className="ring-1 border border-gray-200 w-full rounded-md p-2 text-gray-700 resize-none h-[30vh]"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[crimson] py-2 px-8 rounded-md mt-2 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Notes */}
      <div className="mt-15">
        <NotesContent
          notes={notes}
          onDelete={deleteNote}
          onEdit={startEdit}
          onUpdate={updateNote}
          editingID={editingId}
          editTitle={editTitle}
          editContent={editContent}
          setEditTitle={setEditTitle}
          setEditContent={setEditContent}
          cancelEdit={cancelEdit}
        />
      </div>
    </div>
  );
};

export default NextForm;
