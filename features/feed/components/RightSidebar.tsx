import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { staffPicks, recommendedTopics } from "@/features/feed/constants/sidebar"

export function RightSidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-8 w-72 shrink-0">
      <section>
        <h3
          className="text-base font-bold mb-4"
          style={{ fontFamily: '"Inter", sans-serif', color: "#242424" }}
        >
          Staff Picks
        </h3>

        <div className="flex flex-col gap-5">
          {staffPicks.map((pick) => (
            <article key={pick.id} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={pick.editorAvatar} alt={pick.editor} />
                  <AvatarFallback
                    className="text-[9px] font-bold"
                    style={{ backgroundColor: "#F2F2F2", color: "#242424" }}
                  >
                    {pick.editor.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {pick.publication ? (
                  <p className="text-xs" style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}>
                    <span>{pick.publication} by </span>
                    <span className="font-medium" style={{ color: "#242424" }}>{pick.editor}</span>
                  </p>
                ) : (
                  <p className="text-xs font-medium" style={{ color: "#242424", fontFamily: '"Inter", sans-serif' }}>
                    {pick.editor}
                  </p>
                )}
              </div>

              <button
                className="text-sm font-bold leading-snug text-left hover:text-[#757575] transition-colors"
                style={{ fontFamily: '"Inter", sans-serif', color: "#242424" }}
              >
                {pick.title}
              </button>

              <p className="text-xs" style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}>
                {pick.date}
              </p>
            </article>
          ))}
        </div>

        <button
          className="mt-4 text-sm transition-colors hover:text-[#242424]"
          style={{ color: "#757575", fontFamily: '"Inter", sans-serif' }}
        >
          See the full list
        </button>
      </section>

      <section>
        <h3
          className="text-base font-bold mb-4"
          style={{ fontFamily: '"Inter", sans-serif', color: "#242424" }}
        >
          Recommended topics
        </h3>

        <div className="flex flex-wrap gap-2">
          {recommendedTopics.map((topic) => (
            <button
              key={topic}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-gray-200"
              style={{
                backgroundColor: "#F2F2F2",
                color: "#242424",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {topic}
            </button>
          ))}
        </div>
      </section>
    </aside>
  )
}
