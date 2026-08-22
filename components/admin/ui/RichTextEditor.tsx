'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-border rounded-md overflow-hidden bg-background">
      <div className="flex flex-wrap gap-2 p-2 border-b border-border bg-muted/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('bold') ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('italic') ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('URL');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="px-2 py-1 rounded text-sm bg-background hover:bg-muted"
        >
          Image URL
        </button>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[300px] prose dark:prose-invert max-w-none focus:outline-none" />
    </div>
  );
}
