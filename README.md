# 🎨 Artistry
> **Where Artists Share Their Story.**

Artistry is a premium, minimalist social platform designed for creators to showcase their work and share their creative journeys. Inspired by the clean, sophisticated design systems of **Apple** and **Google**, Artistry focuses on high-fidelity typography, spacious layouts, and a seamless "Pro" writing experience.

---

## ✨ Premium Features

- **🛡️ Secure Authentication**: Full email/password auth powered by Supabase SSR.
- **🖊️ Pro Story Creator**: A distraction-free, Markdown-enabled editor with a sticky minimalist toolbar.
- **📱 Responsive Design**: A fluid experience across mobile, tablet, and desktop using a custom Apple-inspired design system.
- **🏞️ Hero Aesthetics**: High-end hero sections with abstract minimalist backgrounds.
- **👤 Artist Profiles**: Auto-generated profiles with customizable art styles and bios.
- **🚀 Real-time Feed**: Fast, optimized discovery feed featuring local and global art stories.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + Custom Vanilla CSS |
| **Backend/Auth** | [Supabase](https://supabase.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Design Language** | Minimalist Apple/Google Aesthetics |

---

## 🚀 Live Demo

Check out the live platform here:  
**[Artistry Platform](https://deknek-lake.vercel.app)**

---

## 🛠️ Local Development

### 1. Prerequisites
- Node.js 18+
- A Supabase Project

### 2. Setup
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Database Setup
Run the `supabase-schema.sql` script in your Supabase SQL Editor to initialize the tables and triggers. 
To see mock data, run `supabase-mock-data.sql`.

### 5. Run Server
```bash
npm run dev
```

---

## 👨‍🎨 Design Philosophy
Artistry was built with the belief that **simplicity is the ultimate sophistication**. Every pixel was meticulously aligned to ensure that the content—the artist's story—is always the star of the show.

Developed for the **Full Stack Developer Internship Round 2 Assignment**.
