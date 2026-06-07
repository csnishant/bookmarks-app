"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Essential configuration hook for your Resend custom workflow/redirects
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setSuccessMsg(
      "Verification link sent! Please check your email inbox to activate your account.",
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md transform transition-all duration-300">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="p-3 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-500/30 text-white flex items-center justify-center">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Create your account
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Join EagerMinds Bookmarks today
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Email input field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase block">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-slate-950/50 text-white placeholder-slate-500 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 p-3 pl-11 rounded-xl transition-all duration-200 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password input field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase block">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 text-white placeholder-slate-500 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 p-3 pl-11 rounded-xl transition-all duration-200 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Dynamic Interactive Alerts */}
            {errorMsg && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium">{errorMsg}</p>
              </div>
            )}

            {successMsg && (
              <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3.5 rounded-xl text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="font-medium">{successMsg}</p>
              </div>
            )}

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={loading || !!successMsg}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white p-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Securing workspace...</span>
                </>
              ) : (
                <>
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation Options */}
          <div className="border-t border-slate-800/80 pt-4 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/auth/login")}
                className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 transition-colors">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
