"use client";

import { LogOut, Bookmark } from "lucide-react";

interface NavbarProps {
  email?: string;
  onSignOut: () => void;
}

export default function Navbar({ email, onSignOut }: NavbarProps) {
  return (
    <nav className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Bookmark className="w-5 h-5" />
          </div>
          <span className="font-extrabold tracking-tight text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            EagerMinds LinkVault
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs font-mono text-slate-400 bg-slate-800/40 border border-slate-700/60 px-2.5 py-1 rounded-md max-w-[180px] truncate hidden sm:inline-block">
            {email}
          </span>
          <button
            onClick={onSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-sm text-slate-400 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-all duration-200">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
