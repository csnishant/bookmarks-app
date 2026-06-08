"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import Navbar from "@/components/dashboard/Navbar";
import HandleForm from "@/components/dashboard/HandleForm";
import BookmarkForm from "@/components/dashboard/BookmarkForm";
import BookmarkList from "@/components/dashboard/BookmarkList";

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  is_public: boolean;
  user_id: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  const [handle, setHandle] = useState("");
  const [isSavingHandle, setIsSavingHandle] = useState(false);
  const [handleMsg, setHandleMsg] = useState({ type: "", text: "" });

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        router.push("/auth/login");
        return;
      }
      setUser(user);
      await Promise.all([fetchBookmarks(user.id), fetchProfile(user.id)]);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const fetchBookmarks = async (userId: string) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) setBookmarks(data);
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("handle")
      .eq("id", userId)
      .single();

    if (!error && data?.handle) {
      setHandle(data.handle);
    }
  };

  const handleSaveHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHandle(true);
    setHandleMsg({ type: "", text: "" });

    const cleanHandle = handle
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "");

    if (!cleanHandle) {
      setHandleMsg({ type: "error", text: "Handle cannot be empty." });
      setIsSavingHandle(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, handle: cleanHandle });

    setIsSavingHandle(false);

    if (error) {
      setHandleMsg({ type: "error", text: "Handle already taken or invalid!" });
    } else {
      setHandle(cleanHandle);
      setHandleMsg({
        type: "success",
        text: `Handle successfully updated to @${cleanHandle}!`,
      });
    }
  };

  const handleSaveBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;
    setActionLoading(true);

    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const bookmarkPayload = {
      title: title.trim(),
      url: formattedUrl,
      is_public: isPublic,
      user_id: user.id,
    };

    if (editingId) {
      const { error } = await supabase
        .from("bookmarks")
        .update(bookmarkPayload)
        .eq("id", editingId)
        .eq("user_id", user.id);

      if (!error) {
        setBookmarks(
          bookmarks.map((b) =>
            b.id === editingId ? { ...b, ...bookmarkPayload } : b,
          ),
        );
        setEditingId(null);
      }
    } else {
      const { data, error } = await supabase
        .from("bookmarks")
        .insert([bookmarkPayload])
        .select()
        .single();

      console.log("BOOKMARK DATA:", data);
      console.log("BOOKMARK ERROR:", error);

      if (error) {
        alert(error.message);
        setActionLoading(false);
        return;
      }

      if (data) {
        setBookmarks([data, ...bookmarks]);
      }
    }

    setTitle("");
    setUrl("");
    setIsPublic(false);
    setActionLoading(false);
  };

  const handleDeleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setBookmarks(bookmarks.filter((b) => b.id !== id));
    }
  };

  const startEdit = (bookmark: BookmarkItem) => {
    setEditingId(bookmark.id);
    setTitle(bookmark.title);
    setUrl(bookmark.url);
    setIsPublic(bookmark.is_public);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setUrl("");
    setIsPublic(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-200">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
        <p className="text-sm font-medium tracking-wide text-slate-400">
          Loading your safe workspace...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 font-sans pb-12">
      <Navbar email={user?.email} onSignOut={handleSignOut} />

      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6 lg:col-span-1">
          <HandleForm
            handle={handle}
            setHandle={setHandle}
            isSavingHandle={isSavingHandle}
            handleMsg={handleMsg}
            onSaveHandle={handleSaveHandle}
          />

          <BookmarkForm
            editingId={editingId}
            title={title}
            setTitle={setTitle}
            url={url}
            setUrl={setUrl}
            isPublic={isPublic}
            setIsPublic={setIsPublic}
            actionLoading={actionLoading}
            onSaveBookmark={handleSaveBookmark}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <BookmarkList
          bookmarks={bookmarks}
          onStartEdit={startEdit}
          onDeleteBookmark={handleDeleteBookmark}
        />
      </main>
    </div>
  );
}
