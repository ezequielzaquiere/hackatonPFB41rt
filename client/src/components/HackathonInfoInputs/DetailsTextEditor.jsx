import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { useEffect } from 'react';

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap justify-center gap-2 p-3 bg-[#191919] border border-[#9A4EAE] rounded-t-lg">
            {/* Botón de Negrita */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    editor.chain().focus().toggleBold().run();
                }}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    editor.isActive('bold')
                        ? 'bg-[#9A4EAE] text-white shadow-md'
                        : 'bg-[#222] text-white hover:bg-[#7A3E8F]'
                }`}
            >
                <strong>B</strong>
            </button>

            {/* Botón de Itálica */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    editor.chain().focus().toggleItalic().run();
                }}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    editor.isActive('italic')
                        ? 'bg-[#9A4EAE] text-white shadow-md'
                        : 'bg-[#222] text-white hover:bg-[#7A3E8F]'
                }`}
            >
                <em>I</em>
            </button>

            {/* Botón de Tachado */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    editor.chain().focus().toggleStrike().run();
                }}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    editor.isActive('strike')
                        ? 'bg-[#9A4EAE] text-white shadow-md'
                        : 'bg-[#222] text-white hover:bg-[#7A3E8F]'
                }`}
            >
                <s>S</s>
            </button>

            {/* Botón de Undo */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    editor.chain().focus().undo().run();
                }}
                className="px-4 py-2 rounded-lg border bg-[#222] text-white hover:bg-[#7A3E8F] transition-all duration-300"
            >
                ↺ Undo
            </button>

            {/* Botón de Redo */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    editor.chain().focus().redo().run();
                }}
                className="px-4 py-2 rounded-lg border bg-[#222] text-white hover:bg-[#7A3E8F] transition-all duration-300"
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
