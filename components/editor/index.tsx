// 에디터 전체

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";

export default function Editor() {

    const editor = useEditor({
        extensions: [StarterKit]
    });

    return (
        <div>
            {/* 툴바 */}
            <ToolBar editor={editor} />
            {/* 본문 */}
            <EditorContent editor={editor} />
        </div>
    )
}