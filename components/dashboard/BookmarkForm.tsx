"use client";

import { Globe, Lock, Loader2, Plus } from "lucide-react";

interface BookmarkFormProps {
  editingId: string | null;
  title: string;
  setTitle: (val: string) => void;
  url: string;
  setUrl: (val: string) => void;
  isPublic: boolean;
  setIsPublic: (val: boolean) => void;
  actionLoading: boolean;
  onSaveBookmark: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
}

export default function BookmarkForm({
  editingId,
  title,
  setTitle,
  url,
  setUrl,
  isPublic,
  setIsPublic,
  actionLoading,
  onSaveBookmark,
  onCancelEdit,
}: BookmarkFormProps) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl">
      <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-4">
        {editingId ? "Modify Bookmark" : "Add New Bookmark"}
      </h2>
      <form onSubmit={onSaveBookmark} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs text-slate-400 font-medium">Title</label>
          <input
            type="text"
            required
            placeholder="e.g., GitHub Workspace"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950/50 text-white placeholder-slate-600 border border-slate-800 focus:border-indigo-500 p-2.5 text-sm rounded-xl outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-slate-400 font-medium">URL Link</label>
          <input
            type="text"
            required
            placeholder="github.com/profile"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-slate-950/50 text-white placeholder-slate-600 border border-slate-800 focus:border-indigo-500 p-2.5 text-sm rounded-xl outline-none font-mono"
          />
        </div>

        <div className="flex items-center justify-between bg-slate-950/30 border border-slate-800 p-3 rounded-xl">
          <div className="flex items-center space-x-2">
            {isPublic ? (
              <Globe className="w-4 h-4 text-emerald-400" />
            ) : (
              <Lock className="w-4 h-4 text-amber-500" />
            )}
            <span className="text-xs font-medium text-slate-300">
              {isPublic ? "Visible on public tree" : "Private (Hidden)"}
            </span>
          </div>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
          />
        </div>

        <div className="flex gap-2 pt-2">
          {editingId && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold py-2.5 rounded-xl transition-all">
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={actionLoading}
            className="flex-[2] bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1">
            {actionLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{editingId ? "Apply Changes" : "Save Vault Link"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
