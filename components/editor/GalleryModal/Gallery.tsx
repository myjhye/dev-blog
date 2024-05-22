// 갤러리 내 사진 모음

import { BsCardImage } from "react-icons/bs";
import Image from "./Image";

interface Props {
    images: { src: string }[];
    onSelect(src: string): void;
    uploading?: boolean;
    selectedImage?: string;
}

export default function Gallery({ 
    images, 
    onSelect,
    // 기본 값으로 업로드 중이 아닌 상태 
    uploading = false,
    // 기본 값으로 선택된 이미지가 없는 상태
    selectedImage = '', 
}: Props) {
    return (
        <div className="flex flex-wrap">
            {/* 업로드 중 표시 */}
            {uploading && (
                <div className="basis-1/4 p-2 aspect-square flex flex-col items-center justify-center bg-secondary-light text-primary-dark rounded animate-pulse">
                    <BsCardImage size={60} />
                    <p>Uploading</p>
                </div>
            )}
            {/* 갤러리 이미지 */}
            {images.map((image, index) => {
                return (
                    <div key={index} className="basis-1/4">
                        <Image 
                            src={image.src}
                            selected={selectedImage === image.src}
                            onClick={() => onSelect(image.src)}
                        />
                    </div>
                );
            })}
        </div>
    );
}
