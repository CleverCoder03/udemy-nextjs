"use client";

import { Pencil, Trash2, Plus, StickyNote, Calendar } from "lucide-react";

const NotesContent = ({ notes }) => {

  const formatDate = (date) =>
  new Intl.DateTimeFormat("en-GB").format(new Date(date));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 py-6 md:py-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              My Workspace
            </h1>
            <p className="text-gray-500 mt-2 text-sm font-medium uppercase tracking-widest">
              {notes.length} Total Notes
            </p>
          </div>
          
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20 active:scale-95">
            <Plus size={20} /> Create Note
          </button>
        </header>

        {/* Grid */}
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-gray-800 rounded-3xl bg-[#111] shadow-inner">
            <StickyNote size={48} className="text-gray-800 mb-4" />
            <p className="text-gray-600">No notes found. Start writing!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="group flex flex-col bg-[#161616] border border-gray-800 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 shadow-2xl hover:shadow-blue-500/5"
              >
                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {note.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {note.content}
                  </p>
                </div>

                {/* Date Metadata (from your image) */}
                <div className="space-y-1 mb-6 py-3 border-t border-gray-800/50">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-gray-600">
                    <Calendar size={12} />
                    <span>Created: {formatDate(note.createdAt)}</span>
                  </div>
                  
                  {note.updatedAt !== note.createdAt && (
                    <div className="text-[11px] font-medium uppercase tracking-wider text-blue-500/60 pl-5">
                      Updated: {formatDate(note.updatedAt)}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#1f1f1f] hover:bg-blue-600 text-gray-300 hover:text-white py-2.5 rounded-lg transition-all text-xs font-bold border border-gray-700 hover:border-blue-500">
                    <Pencil size={14} /> EDIT
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#1f1f1f] hover:bg-red-600 text-gray-300 hover:text-white py-2.5 rounded-lg transition-all text-xs font-bold border border-gray-700 hover:border-red-500">
                    <Trash2 size={14} /> DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesContent;