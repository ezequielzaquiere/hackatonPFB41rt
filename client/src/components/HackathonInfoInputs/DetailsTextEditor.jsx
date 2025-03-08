import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { useEffect } from 'react';

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-50 border border-gray-300 rounded-t-lg dark:bg-gray-700 dark:border-gray-600">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded border ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
                <strong>B</strong>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded border ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
                <em>I</em>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`px-3 py-1 rounded border ${editor.isActive('strike') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
                <s>S</s>
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="px-3 py-1 rounded border hover:bg-gray-200 dark:hover:bg-gray-600"
            >
                ↺ Undo
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="px-3 py-1 rounded border hover:bg-gray-200 dark:hover:bg-gray-600"
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
            editor.commands.setContent(value || '', false);
        }
    }, [value, editor]);

    useEffect(() => {
        return () => editor?.destroy();
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="mb-6">
            <div className="bg-[#333] border border-[#555] text-white placeholder-[#777] focus:ring-[#9A4EAE] focus:border-[#9A4EAE] block w-full p-2.5 rounded-lg">
                <MenuBar editor={editor} />
                <div className="p-4 min-h-[250px] bg-[#444] border border-[#666] rounded-b-lg focus:outline-none">
                    <EditorContent
                        editor={editor}
                        className="focus:outline-none min-h-[200px] bg-[#444] text-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default TextEditor;
