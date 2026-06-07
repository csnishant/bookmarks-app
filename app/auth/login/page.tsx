"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  LogIn,
  KeyRound,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    // Securely routes your authenticated user straight to the dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md transform transition-all duration-300">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="p-3 bg-gradient-to-tr from-emerald-500 to-indigo-500 rounded-2xl shadow-lg shadow-emerald-500/20 text-white flex items-center justify-center">
            <KeyRound className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Welcome back
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Access your secure bookmark vault
          </p>
        </div>

        {/* Main Login Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase block">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-slate-950/50 text-white placeholder-slate-500 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 p-3 pl-11 rounded-xl transition-all duration-200 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase block">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 text-white placeholder-slate-500 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 p-3 pl-11 rounded-xl transition-all duration-200 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Error Message Alert */}
            {msg && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium">{msg}</p>
              </div>
            )}

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white p-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Router Links */}
          <div className="border-t border-slate-800/80 pt-4 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/auth/signup")}
                className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 transition-colors">
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
