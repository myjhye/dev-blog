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
    // 갤러리 모달 표시
    const [showGallery, setShowGallery] = useState(false);
    // 업로드 상태
    const [uploading, setUploading] = useState(false);
    // 이미지 목록 
    const [images, setImages] = useState<{ src: string }[]>([]);

    //** cloudinary에서 이미지 불러오기
    const fetchImages = async () => {
        const { data } = await axios('/api/image');
        setImages(data.images);
    };

    //** 이미지 업로드 처리
    const handleImageUpload = async (image: File) => {
        setUploading(true);
        
        const formData = new FormData();
        
        // formData에 업로드할 파일 추가
        formData.append('image', image);
        // formData 객체 포함해 post 요청 보내기
        const { data } = await axios.post('/api/image', formData);

        setUploading(false);
        
        // 업로드된 이미지를 기존 이미지 목록에 추가
        setImages([
            // 업로드된 이미지
            data,
            // 기존 이미지 목록
            ...images,
        ]);
    };

    // 이미지 선택 처리 함수
    const handleImageSelection = (file: { src: string; altText: string }) => {
        if (editor) {
            // 에디터에 이미지 삽입
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
            // 에디터 css -> 최대 너비를 전체 너비로, 수평 중앙 배치..
            attributes: {
                class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full'
            }
        },
    });

    // url을 특정 텍스트에 삽입한 후에도 텍스트 범위를 잃지않고 유지
    useEffect(() => {
        if (editor && selectionRange) {
            editor.commands.setTextSelection(selectionRange);
        }
    }, [editor, selectionRange]);


    // 갤러리 모달 열면 이미지 불러오기
    useEffect(() => {
        if (showGallery) {
            fetchImages();
        }
    }, [showGallery]);


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
