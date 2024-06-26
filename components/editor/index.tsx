// 에디터 전체 (최상위)

import { EditorContent, useEditor, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image"; // Image 확장 추가
import { ChangeEventHandler, useEffect, useState } from "react";
import EditLink from "./Link/EditLink";
import GalleryModal from "./GalleryModal";
import axios from "axios";
import SEOForm, { SeoResult } from "./SeoForm";
import ActionButton from "../common/ActionButton";
import ThumbnailSelector from "./ThumbnailSelector";

// 게시물 최종 형태
export interface FinalPost extends SeoResult {
    title: string;
    content: string;
    thumbnail?: File | string;
};

interface Props {
    initialValue?: FinalPost
    btnTitle?: string
    busy?: boolean
    onSubmit(post: FinalPost): void
}

export default function Editor({ 
    initialValue, 
    btnTitle = "Submit", 
    busy = false, 
    onSubmit 
}: Props) {
    // 선택된 텍스트 범위
    const [selectionRange, setSelectionRange] = useState<Range>();
    // 갤러리 모달 표시
    const [showGallery, setShowGallery] = useState(false);
    // cloudinary 이미지 업로드 상태
    const [uploading, setUploading] = useState(false);
    // cloudinary 이미지 목록 
    const [images, setImages] = useState<{ src: string }[]>([]);

    const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();

    // 게시물
    const [post, setPost] = useState<FinalPost>({
        title: "",
        content: "",
        meta: "",
        tags: "",
        slug: "",
        thumbnail: "",
    });

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


    // 게시물 제출
    const handleSubmit = () => {
        if (!editor) {
            return
        }

        onSubmit({
            ...post,
            // 에디터의 내용을 HTML로 가져와서 게시물에 저장
            content: editor.getHTML()
        });
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
            // 유튜브 비디오 스타일 설정
            Youtube.configure({
                width: 840,
                height: 472.5,
                HTMLAttributes: {
                    class: "mx-auto rounded",
                }
            }),
            // Image 본문 추가
            Image, 
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

    // 제목 업데이트
    const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setPost({
            ...post,
            title: target.value,
        })
    }

    // SEO 업데이트
    const updateSeoValue = (result: SeoResult) => {
        setPost({
            ...post,
            ...result,
        })
    }

    // 썸네일 업데이트
    const updateThumbnail = (file: File) => {
        setPost({
            ...post,
            thumbnail: file,
        })
    }

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



    // 초기 값 설정
    useEffect(() => {
        if (initialValue) {
            // 초기 값을 post 상태에 설정
            setPost({
                ...initialValue
            });
            // 에디터 내용을 초기 값으로 설정
            editor?.commands.setContent(initialValue.content);

            const { meta, slug, tags } = initialValue;

            // SEOForm에서 관리 - meta, slug, tags
            setSeoInitialValue({
                meta,
                slug,
                tags,
            });
        }
    }, [initialValue, editor]);

    return (
        <>
            <div className="p-3 dark:bg-primary-dark bg-primary transition">
                <div className="sticky top-0 z-10 dark:bg-priary-dark bg-primary">
                    {/* 썸네일 선택 & 제출 버튼 */}
                    <div className="flex items-center justify-between mb-3">
                        <ThumbnailSelector 
                            handleChange={updateThumbnail} 
                            initialValue={post.thumbnail as string}
                        />
                        <div className="inline-block">
                            <ActionButton 
                                busy={busy}
                                title={btnTitle}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>

                    {/* 제목 입력 칸 */}
                    <input 
                        type="text" 
                        className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3" 
                        placeholder="Title"
                        onChange={updateTitle}
                        value={post.title}
                    />

                    {/* 툴바 */}
                    <ToolBar 
                        editor={editor}
                        onOpenImageClick={() => setShowGallery(true)} 
                    />

                    {/* 구분선 */}
                    <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
                </div>

                {/* 링크 편집 버튼 3개 - 링크 열기, 링크 편집, 링크 제거 */}
                {editor 
                    ? <EditLink editor={editor} /> 
                    : null
                }

                {/* 본문 */}
                <EditorContent 
                    editor={editor}
                    className="min-h-[300px]" 
                />

                {/* 구분선 */}
                <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />

                {/* SEO */}
                <SEOForm 
                    onChange={updateSeoValue}
                    title={post.title}
                    initialValue={seoInitialValue}
                />
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
