// 에디터 전체 (최상위)

import { EditorContent, useEditor, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image"; // Image 확장 추가
import { useEffect, useState } from "react";
import EditLink from "./Link/EditLink";
import GalleryModal from "./GalleryModal";
import axios from "axios";

export default function Editor() {
    // 선택된 텍스트 범위
    const [selectionRange, setSelectionRange] = useState<Range>();
    const [showGallery, setShowGallery] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<{ src: string }[]>([]);

    // cloudinary에서 이미지 불러오기
    const fetchImages = async () => {
        const { data } = await axios('/api/image');
        setImages(data.images);
    };

    const handleImageUpload = async (image: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', image);
        const { data } = await axios.post('/api/image', formData);
        setUploading(false);
        
        setImages([
            data,
            ...images,
        ]);
    };

    // 이미지 선택 처리 함수
    const handleImageSelection = (file: { src: string; altText: string }) => {
        if (editor) {
            editor.chain().focus().setImage({ 
                src: file.src, 
                alt: file.altText 
            }).run();
        }
    };

     


    // 에디터 인스턴스
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
            Youtube.configure({
                width: 840,
                height: 472.5,
                HTMLAttributes: {
                    class: "mx-auto rounded",
                }
            }),
            Image, // Image 확장 추가
        ],

        // 에디터 스타일, 레이아웃 지정 -> 텍스트 키우기, 다크모드 지원, 전체 너비/높이 사용
        editorProps: {
            // 에디터 내부에서 마우스 클릭 이벤트 발생 시 실행 함수
            handleClick(view, pos, event) {
                const selectionRange = getMarkRange(
                    view.state.doc.resolve(pos), 
                    view.state.schema.marks.link
                );
                if (selectionRange) {
                    setSelectionRange(selectionRange);
                }
            }, 
            attributes: {
                class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full'
            }
        },
    });

    useEffect(() => {
        if (editor && selectionRange) {
            editor.commands.setTextSelection(selectionRange);
        }
    }, [editor, selectionRange]);

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <>
            <div className="p-3 dark:bg-primary-dark bg-primary transition">
                {/* 툴바 */}
                <ToolBar 
                    editor={editor}
                    onOpenImageClick={() => setShowGallery(true)} 
                />

                {/* 구분선 */}
                <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />

                {/* 링크 편집 버튼 3개 - 링크 열기, 링크 편집, 링크 제거 */}
                {editor 
                    ? <EditLink editor={editor} /> 
                    : null
                }

                {/* 본문 */}
                <EditorContent editor={editor} />
            </div>

            <GalleryModal 
                visible={showGallery}
                onClose={() => setShowGallery(false)}
                images={images}
                onSelect={handleImageSelection}
                onFileSelect={handleImageUpload}
                uploading={uploading}
            />
        </>
    )
}
