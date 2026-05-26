"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { useEffect, useState, useRef, useCallback } from "react"
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ImageIcon,
  Loader2,
  Sparkles,
} from "lucide-react"
import { useUploadMedia } from "@/features/feed/hooks/useUploadMedia"
import { useAiImprove } from "@/components/editor/hooks/useAiImprove"
import { AiImprovePanel } from "@/components/editor/AiImprovePanel"
import type { Tone } from "@/components/editor/hooks/useAiImprove"

interface TiptapEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  onImageUploaded?: (image: { url: string; publicId: string }) => void
  categoryId?: string
}

export function TiptapEditor({ value, onChange, onImageUploaded, categoryId }: TiptapEditorProps) {
  const [isReady, setIsReady] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadMedia = useUploadMedia()

  const {
    aiStatus,
    setAiStatus,
    aiResult,
    aiError,
    startStream,
    insertResult,
    discardResult,
    cancelStream,
  } = useAiImprove()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({ inline: false }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    onCreate: () => setIsReady(true),
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[300px] px-4 py-3 [&_p]:leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_img]:rounded-lg [&_img]:my-4 [&_img]:mx-auto [&_img]:max-w-full [&_img]:h-auto",
      },
    },
  })

  useEffect(() => {
    if (isReady && editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [value, isReady, editor])

  const handleImprove = useCallback(
    (tone: Tone) => {
      if (!editor || !categoryId) return
      const content = editor.getHTML()
      if (!content.trim()) return
      startStream(content, categoryId, tone)
    },
    [editor, categoryId, startStream]
  )

  const handleInsert = useCallback(() => {
    const result = insertResult()
    if (result && editor) {
      editor.commands.setContent(result)
    }
  }, [insertResult, editor])

  const rawText = value?.replace(/<[^>]*>/g, '').trim() ?? ''
  const hasContent = rawText.length > 0
  const canUseAI = hasContent && !!categoryId

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editor) return

    uploadMedia.mutate(
      { file, folder: "posts" },
      {
        onSuccess: (result) => {
          editor.chain().focus().setImage({ src: result.url }).run()
          onImageUploaded?.({ url: result.url, publicId: result.publicId })
        },
      }
    )

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (!editor) return null

  return (
    <div className="border border-input rounded-lg overflow-hidden bg-white">
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-input bg-gray-50 flex-wrap">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          label="Bold"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          label="Italic"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          label="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          label="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          label="Bullet List"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          label="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px h-5 bg-border mx-1" />

        <ToolbarButton
          onClick={() => fileInputRef.current?.click()}
          isActive={false}
          label="Add image"
        >
          {uploadMedia.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImageIcon className="w-4 h-4" />
          )}
        </ToolbarButton>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
          disabled={uploadMedia.isPending}
        />

        <div className="w-px h-5 bg-border mx-1" />

        <ToolbarButton
          onClick={() => {
            if (aiStatus === "idle") {
              if (!canUseAI && !categoryId) return
              setAiStatus("selecting-tone")
            }
          }}
          isActive={aiStatus === "selecting-tone" || aiStatus === "streaming"}
          label={categoryId ? "Improve with AI" : "Select a category first"}
          disabled={!canUseAI && aiStatus === "idle"}
        >
          {aiStatus === "streaming" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
        </ToolbarButton>
      </div>

      <AiImprovePanel
        aiStatus={aiStatus}
        aiResult={aiResult}
        aiError={aiError}
        onSelectTone={handleImprove}
        onInsert={handleInsert}
        onDiscard={discardResult}
        onCancel={cancelStream}
        onRetry={() => setAiStatus("selecting-tone")}
      />

      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarButton({
  onClick,
  isActive,
  label,
  disabled,
  children,
}: {
  onClick: () => void
  isActive: boolean
  label: string
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      disabled={disabled}
      className={`p-2 rounded-md transition-colors ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : isActive
            ? "bg-gray-200 text-[#242424]"
            : "text-[#757575] hover:bg-gray-100 hover:text-[#242424]"
      }`}
    >
      {children}
    </button>
  )
}
