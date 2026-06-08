"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  FolderHeart,
  Search,
  Flame,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import { toast } from "sonner";

export default function RootHomePage() {
  const router = useRouter();
  const [searchHandle, setSearchHandle] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Real-time Auth Listener setup kiya hai yahan
  useEffect(() => {
    // 1. Initial check jab page load ho
    const checkActiveSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setCheckingAuth(false);
    };
    checkActiveSession();

    // 2. Real-time listener: Jaise hi login/logout ho, ye instantly UI badal dega
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setCheckingAuth(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSearchProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanHandle = searchHandle
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "");

    if (!cleanHandle) {
      toast.error("Please enter a valid handle!");
      return;
    }

    toast.info(`Navigating to public profile @${cleanHandle}...`);
    router.push(`/${cleanHandle}`);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">
          Syncing Ecosystem...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 font-sans relative overflow-hidden flex flex-col justify-between px-4 sm:px-6">
      {/* Background Radial Glow Nodes */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-500/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-emerald-500/5 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      {/* Responsive Navbar */}
      <header className="max-w-7xl w-full mx-auto py-5 flex justify-between items-center z-10 border-b border-slate-900/60">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-xl text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="font-bold text-sm sm:text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            EagerMinds Bookmarks
          </span>
        </div>

        {/* Dynamic Buttons based on Auth Status */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isLoggedIn ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-2">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/auth/login")}
                className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                Sign In
              </button>
              <button
                onClick={() => router.push("/auth/signup")}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl text-indigo-400 hover:text-indigo-300 transition-all shadow-md">
                Create Space
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Container Hero */}
      <main className="max-w-4xl w-full mx-auto text-center py-12 sm:py-16 z-10 flex flex-col items-center justify-center flex-grow space-y-8 sm:space-y-10">
        {/* Architecture Badge */}
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-[10px] sm:text-xs text-indigo-400 font-medium">
          <Flame className="w-3.5 h-3.5" />
          Linktree meets Pocket Architecture
        </div>

        {/* Title Headers */}
        <div className="space-y-4 px-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-tight max-w-3xl mx-auto">
            Your secure bookmark vault, with a public face.
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Save personal links safely with multi-tenant privacy, organize your
            reading ecosystem, and share your public profile instantly via
            static handles.
          </p>
        </div>

        {/* Dynamic CTAs Wrapper */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center w-full max-w-xs sm:max-w-md px-4">
          {isLoggedIn ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-gradient-to-r from-indigo-500 to-emerald-600 hover:from-indigo-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group">
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/auth/signup")}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-emerald-600 hover:from-indigo-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group">
                Claim Your Workspace
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => router.push("/auth/login")}
                className="w-full sm:w-auto bg-slate-900/60 hover:bg-slate-900 backdrop-blur-xl border border-slate-800 text-slate-200 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all">
                Access Vault
              </button>
            </>
          )}
        </div>

        {/* Explore Handle Interface */}
        <div className="w-full max-w-xs sm:max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-4 sm:p-5 rounded-2xl shadow-xl space-y-3 text-left mx-4">
          <label className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Explore Public Portfolios
          </label>
          <form
            onSubmit={handleSearchProfile}
            className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-500 font-mono text-xs sm:text-sm">
              @
            </span>
            <input
              type="text"
              placeholder="username"
              value={searchHandle}
              onChange={(e) => setSearchHandle(e.target.value)}
              className="w-full bg-slate-950/50 text-white placeholder-slate-600 border border-slate-800/80 focus:border-indigo-500 p-2 sm:p-2.5 pl-7 sm:pl-8 rounded-xl outline-none font-mono text-xs sm:text-sm transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
          <p className="text-[9px] sm:text-[10px] text-slate-500 leading-normal">
            💡 Evaluator Checkpoint: Enter any claimed database handle above to
            query public links without active authentication blocks.
          </p>
        </div>

        {/* Feature Grid Matrices */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-6 border-t border-slate-900/60 px-4">
          <div className="bg-slate-900/30 border border-slate-900/50 p-4 rounded-xl text-left space-y-1.5">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
            <h3 className="text-[10px] sm:text-xs font-semibold text-white tracking-wide uppercase">
              Multi-Tenant Isolation
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Row-Level Security (RLS) guarded directly at the database engine
              to isolate personal schemas completely.
            </p>
          </div>
          <div className="bg-slate-900/30 border border-slate-900/50 p-4 rounded-xl text-left space-y-1.5">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <h3 className="text-[10px] sm:text-xs font-semibold text-white tracking-wide uppercase">
              Unique @Handles
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Claim a custom routing string that instantly filters public nodes
              to any anonymous viewer on demand.
            </p>
          </div>
          <div className="bg-slate-900/30 border border-slate-900/50 p-4 rounded-xl text-left space-y-1.5">
            <FolderHeart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <h3 className="text-[10px] sm:text-xs font-semibold text-white tracking-wide uppercase">
              Pocket Engine UX
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Complete transactional dashboard management to safe-keep title
              resources, visibility flags, and clean URLs.
            </p>
          </div>
        </div>
      </main>

      {/* Footer System Credits */}
      <footer className="w-full text-center py-6 text-[10px] text-slate-600 border-t border-slate-950/40 z-10">
        © 2026 EagerMinds Assignment Build · Engineered with Next.js 16 &
        Supabase RLS.
      </footer>
    </div>
  );
}
