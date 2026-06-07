"use client";

import {
  Bookmark,
  Globe,
  Lock,
  ExternalLink,
  Edit2,
  Trash2,
} from "lucide-react";

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  is_public: boolean;
  user_id: string;
}

interface BookmarkListProps {
  bookmarks: BookmarkItem[];
  onStartEdit: (b: BookmarkItem) => void;
  onDeleteBookmark: (id: string) => void;
}

export default function BookmarkList({
  bookmarks,
  onStartEdit,
  onDeleteBookmark,
}: BookmarkListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold tracking-tight text-slate-200">
          Your Secured Folders
        </h2>
        <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full font-mono font-medium">
          {bookmarks.length} links saved
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-12 text-center">
          <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-3 stroke-[1.5]" />
          <p className="text-sm text-slate-400 font-medium">
            No bookmarks inside this workspace yet.
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Fill out the creation form to lock down your first entry!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-slate-900/50 backdrop-blur-md border border-slate-800 hover:border-slate-700/80 p-4 rounded-xl flex items-center justify-between gap-4 transition-all group">
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-200 text-sm truncate">
                    {bookmark.title}
                  </h3>
                  {bookmark.is_public ? (
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/10">
                      <Globe className="w-2.5 h-2.5" /> Public
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 font-medium border border-amber-500/10">
                      <Lock className="w-2.5 h-2.5" /> Private
                    </span>
                  )}
                </div>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-indigo-400 font-mono inline-flex items-center gap-1 truncate max-w-full transition-colors">
                  {bookmark.url}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <button
                  onClick={() => onStartEdit(bookmark)}
                  className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60 rounded-lg transition-colors"
                  title="Edit Entry">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteBookmark(bookmark.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"
                  title="Delete Entry">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
