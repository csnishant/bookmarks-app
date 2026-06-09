# EagerMinds LinkVault 

I have completed the hands-on task and successfully built, secured, and deployed the **LinkVault Bookmark App** based on your structural and design rules.

### 🌐 Project Links
* **Live App URL:** [https://bookmarks-task-csnishant.vercel.app](https://bookmarks-task-csnishant.vercel.app)
* **GitHub Repository:** [csnishant/bookmarks-app](https://github.com/csnishant/bookmarks-app)

---

## 🚀 Key Features Built Inside the App

* **User Authentication & Email Verification:** Complete Sign Up and Log In flows using Supabase. The email verification link redirects the user directly back to the app smoothly.
* **Unique Handle Claim System (@handle):** Every user can claim a unique custom username. The app checks database constraints so that no two users can have the same handle.
* **Full Bookmark CRUD Operations:** Users can easily Add, View, Edit, and Delete links in real-time.
* **Privacy Toggle Controls:** A feature to instantly switch links between "Public" (visible to everyone) and "Private" (visible only to the logged-in owner).
* **Dynamic Toast Notifications:** Smooth, clean pop-up alerts that guide the user on every action (Success, Error, Warnings).
* **100% Mobile Responsive Interface:** Premium dark-themed glassmorphism layout that looks stunning on mobile screens, tablets, and desktops alike.

---

## 🏗️ Code Architecture (Clean & Modular Structure)

To make the code clean, readable, and production-ready for code reviews, I divided the main dashboard page into small independent files:

* `Navbar.tsx` - Handles top branding bar, active user email display, and logout controls.
* `HandleForm.tsx` - Manages unique username claims and inputs.
* `BookmarkForm.tsx` - Processes form fields for creating and editing existing links.
* `BookmarkList.tsx` - Displays the grid stream of secure saved links.

---

## 🧠 Challenges I Faced & How I Solved Them

### 1. Supabase 403 Forbidden Error (Database RLS Policies)
* **Problem:** Initially, the frontend console showed a `403 (Forbidden)` error when trying to fetch or save profiles and bookmarks because the raw database was blocking requests.
* **Fix:** I manually opened the Supabase SQL Editor and wrote precise Row-Level Security (RLS) policies. I used `auth.uid() = user_id` to ensure users can only modify their own personal data.

### 2. Email Rate Limit Exceeded (`429 Error`)
* **Problem:** Supabase free subscription has a strict rate limit for sending authentication emails during continuous local testing.
* **Fix:** To tackle this limit, I directly tested features using pre-registered and pre-verified test emails. I also enabled auto-confirmation rules inside the backend to prevent the development pipeline from blocking.

---

## 🛡️ Edge Cases Handled Smartly

* **Strict Route Protection:** If an unauthenticated guest tries to forcefully visit `/dashboard` by typing the URL manually, the app automatically intercepts the request and kicks them back to the `/auth/login` page.
* **Auto HTTPS Protocol Check:** If a user types a raw link like `github.com` without adding a protocol, the application auto-appends `https://` before sending it to PostgreSQL to avoid broken link redirects.
* **Input Sanitization:** Handle inputs are heavily sanitized in real-time using regular expressions to prevent spaces, uppercase letters, and dangerous symbols.


