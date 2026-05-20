export interface StaffPick {
  id: string
  editor: string
  editorAvatar: string
  title: string
  date: string
  isPremium?: boolean
  publication?: string
}

export const staffPicks: StaffPick[] = [
  {
    id: "1",
    editor: "Faye Seidler",
    editorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=faye",
    title: "I Never Thought I'd Get Old Enough to Wipe the Dust Off a PS2",
    date: "May 6",
  },
  {
    id: "2",
    editor: "Fason Jordan",
    editorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fason",
    title: "My Ted Turner escapades",
    date: "May 6",
  },
  {
    id: "3",
    editor: "Pete Cripps",
    editorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pete",
    title: "What 50 Years of Photography Has Taught Me About Seeing",
    date: "Apr 4",
    isPremium: true,
    publication: "In Full Frame",
  },
]

export const recommendedTopics = [
  "Programming",
  "Self Improvement",
  "Data Science",
  "Writing",
  "Technology",
  "Science",
]
