// 갤러리 모달 창 (내부 모달)

import ModalContainer from "@/components/common/ModalContainer";
import Gallery from "./Gallery";
import { ChangeEventHandler, useState } from "react";
import Image from "./Image";
import ActionButton from "@/components/common/ActionButton";
import { AiOutlineCloudUpload } from "react-icons/ai";

export interface ImageSelectionResult {
    src: string;
    altText: string;
};

interface ModalProps {
    visible: boolean;
    onClose: () => void;
};

interface Props extends ModalProps {
    images: { src: string }[];
    uploading?: boolean;
    onSelect(result: ImageSelectionResult): void;
    onFileSelect(image: File): void;
};

export default function GalleryModal({ 
    visible,
    uploading,
    images, 
    onClose, 
    onSelect,
    onFileSelect,
}: Props) {

    // 선택된 이미지
    const [selectedImage, setSelectedImage] = useState("");

    const [altText, setAltText] = useState("");

    const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { files } = e.target
        if (!files) {
            return;
        };

        const file = files[0];
        if (!file.type.startsWith('image')) {
            return onClose && onClose();
        }

        onFileSelect(file);
    }

    const handleSubmit = () => {
        if(!selectedImage) {
            return onClose && onClose();
        }
        onSelect({ 
            src: selectedImage,
            altText,
        });
        onClose && onClose();
    }

    // 이미지 선택
    const handleSelectImage = (src: string) => {
        // 선택한 이미지 상태 저장
        setSelectedImage(src);
    };

    return (
        <ModalContainer 
            visible={visible}
            onClose={onClose}
        >
            <div className="max-w-4xl p-2 bg-primary-dark dark:bg-primary rounded">
                <div className="flex">
                    {/* 갤러리 이미지 */}
                    <div className="basis-[75%] max-h-[450px] overflow-y-auto custom-scroll-bar">
                        <Gallery 
                            images={images}
                            selectedImage={selectedImage || ''}
                            uploading={uploading}
                            onSelect={handleSelectImage}
                        />
                    </div>

                    {/* 이미지 미리보기 & 텍스트 박스 */}
                    <div className="basis-1/4 px-2">
                        <div className="space-y-4">
                            <div>
                                <input
                                    hidden  
                                    type="file"
                                    id="image-input"
                                    onChange={handleOnImageChange} 
                                />
                                <label htmlFor="image-input">
                                    <div className="w-full border-2 border-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded">
                                        <AiOutlineCloudUpload />
                                        <span>Upload Image</span>
                                    </div>
                                </label>
                            </div>

                            {selectedImage ? (
                                <>
                                    <textarea 
                                        className="resize-none w-full bg-transparent rounded border-2 border-secondary-dark focus:ring-1 text-primary dark:text-primary-dark h-32 p-1" 
                                        placeholder="type something.."
                                        value={altText}
                                        onChange={(e) => setAltText(e.target.value)}
                                    />

                                    <ActionButton
                                        onClick={handleSubmit} 
                                        title="Select"
                                    />

                                    <Image src={selectedImage} />
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </ModalContainer>
    )
}
