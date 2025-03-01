import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import React, { useEffect } from 'react';

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex gap-2 p-2 bg-gray-100 rounded-t-lg border-b">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
            >
                <strong>B</strong>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
            >
                <em>I</em>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`px-3 py-1 rounded ${editor.isActive('strike') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
            >
                <s>S</s>
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="px-3 py-1 rounded hover:bg-gray-200"
            >
                ↺ Undo
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="px-3 py-1 rounded hover:bg-gray-200"
            >
                ↻ Redo
            </button>
        </div>
    );
};

const TextEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            Color.configure({ types: [TextStyle.name] }),
            TextStyle,
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
            }),
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '', false); // `false` evita que lo marque como cambio del usuario
        }
    }, [value, editor]);

    useEffect(() => {
        return () => editor?.destroy();
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="max-w-lg border rounded-lg shadow-md">
            <MenuBar editor={editor} />
            <div className="p-3 min-h-[150px] bg-white rounded-b-lg border-t">
                <EditorContent editor={editor} className="focus:outline-none" />
            </div>
        </div>
    );
};

export default TextEditor;
