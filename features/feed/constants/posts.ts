import type { BlogPost } from "@/features/feed/types"

export const posts: BlogPost[] = [
  {
    id: "1",
    publication: "Techx_official",
    publicationLogo: "",
    author: "Ship X / TechX",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=techx",
    date: "4d ago",
    title: "Software Engineer (named Vasilios Syrakis) at Atlassian was laid off on March 12 after 8 years.",
    excerpt: "Vasilios responded with a 40-minute YouTube video showing how the company's entire tech works, free for anyone to copy.",
    coverImage: "/post1-thumbnail.webp",
    claps: "1.7K",
    comments: "35",
    isPremium: true,
  },
  {
    id: "2",
    publication: "All About Computers",
    publicationLogo: "",
    author: "Gopi C K",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gopick",
    date: "May 2",
    title: "8 Backend Skills Every Developer Should Master in 2026",
    excerpt: "Master the core backend skills that help you build scalable, secure, and real world applications beyond basic coding.",
    coverImage: "/post2-thumbnail.webp",
    claps: "252",
    comments: "5",
    isPremium: false,
  },
]

export const tabs = ["For you", "Featured"]
