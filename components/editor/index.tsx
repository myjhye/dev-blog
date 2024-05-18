// 에디터 전체

import { EditorContent, useEditor, getMarkRange } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { useState } from "react";

export default function Editor() {

    const [selectionRange, setSelectionRange] = useState();

    const editor = useEditor({
        // 에디터 확장 기능
        extensions: [
            // 기본
            StarterKit,
            // 밑줄 기능 
            Underline,
            Link.configure({
                autolink: false,
                linkOnPaste: false,
                openOnClick: false,
                HTMLAttributes: {
                    target: ''
                },
            }),
            // 내용 입력 전 문구 
            Placeholder.configure({ 
                placeholder: "Type something",
            }),
        ],

        // 에디터 스타일, 레이아웃 지정 -> 텍스트 키우기, 다크모드 지원, 전체 너비/높이 사용
        editorProps: {
            handleClick(view, pos, event) {
                const selectionRange = getMarkRange(view.state.doc.resolve(pos), view.state.schema.marks.link);
            },
            attributes: {
                class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full'
            }
        },
    });

    return (
        <div className="p-3 dark:bg-primary-dark bg-primary transition">
            {/* 툴바 */}
            <ToolBar editor={editor} />

            {/* 구분선 */}
            <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />

            {/* 본문 */}
            <EditorContent editor={editor} />
        </div>
    )
}