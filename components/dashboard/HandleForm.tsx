"use client";

import {
  User,
  Loader2,
  Sparkles,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface HandleFormProps {
  handle: string;
  setHandle: (val: string) => void;
  isSavingHandle: boolean;
  handleMsg: { type: string; text: string };
  onSaveHandle: (e: React.FormEvent) => void;
}

export default function HandleForm({
  handle,
  setHandle,
  isSavingHandle,
  handleMsg,
  onSaveHandle,
}: HandleFormProps) {
  // URL safe handle banane ke liye client-side helper
  // Yeh spaces hata dega, lowercase karega aur special characters remove karega
  const displayUrlHandle = handle
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl">
      <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-2 mb-4">
        <User className="w-4 h-4 text-indigo-400" />
        Claim Unique Handle
      </h2>
      <form onSubmit={onSaveHandle} className="space-y-3">
        <div className="relative rounded-xl shadow-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 font-mono text-sm">
            @
          </span>
          <input
            type="text"
            placeholder="yourname"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full bg-slate-950/50 text-white placeholder-slate-600 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 p-2.5 pl-7 text-sm rounded-xl outline-none font-mono transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={isSavingHandle}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-xs font-semibold py-2 rounded-xl transition-all duration-150 flex items-center justify-center gap-2">
          {isSavingHandle ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          Save Handle
        </button>
      </form>

      {handleMsg.text && (
        <div
          className={`mt-3 flex items-start gap-2 p-2.5 rounded-lg text-xs font-medium border ${
            handleMsg.type === "success"
              ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
              : "bg-red-500/5 text-red-400 border-red-500/10"
          }`}>
          {handleMsg.type === "success" ? (
            <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          )}
          <p>{handleMsg.text}</p>
        </div>
      )}

      {/* FIXED: Ab link sirf tabhi dikhega jab handle database me save ho chuka ho (success state) */}
      {displayUrlHandle && handleMsg.type === "success" && (
        <p className="mt-3 text-[11px] text-slate-500">
          Your live public profile:{" "}
          <a
            href={`/${displayUrlHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline inline-flex items-center gap-0.5 font-mono">
            /{displayUrlHandle} <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </p>
      )}
    </div>
  );
}
