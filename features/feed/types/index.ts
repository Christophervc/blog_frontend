export interface BlogPost {
  id: string
  publication: string
  publicationLogo?: string
  author: string
  authorAvatar?: string
  date: string
  title: string
  excerpt: string
  coverImage?: string
  claps: string
  comments: string
  isPremium?: boolean
  readTime?: string
}