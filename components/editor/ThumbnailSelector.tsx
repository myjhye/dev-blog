import { ChangeEventHandler, FC, useEffect, useState } from "react";

interface Props {
    // 초기 썸네일 URL
    initialValue?: string; 
    // 파일 변경 처리 함수
    handleChange(file: File): void; 
};

export default function ThumbnailSelector({ initialValue, handleChange }: Props) {

    // 썸네일
    const [selectThumbnail, setSelectedThumbnail] = useState<string>(initialValue || '');

    useEffect(() => {
        if (initialValue) {
            setSelectedThumbnail(initialValue);
        }
    }, [initialValue]);


    // 파일 입력 변경 처리 함수
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { files } = target;

        if (!files || files.length === 0) {
            return;
        }

        // 선택된 파일의 URL을 생성 -> 썸네일 업데이트
        setSelectedThumbnail(URL.createObjectURL(files[0]));
        // 파일 변경을 부모 컴포넌트에 전달
        handleChange(files[0]);
    };

    return (
        <div className="w-32">
            <input 
                type="file"
                hidden 
                accept="image/jpg, image/png, image/jpeg"
                id="thumbnail"
                // 썸네일 파일 변경
                onChange={handleFileChange} 
            />
            <label htmlFor="thumbnail">
                {selectThumbnail ? (
                    <img 
                        src={selectThumbnail}
                        className="border border-dashed border-x-secondary-dark flex items-center justify-center rounded cursor-pointer aspect-video object-cover" 
                    />
                ) : (
                    <PosterUI label="Thumbnail" />
                )}
            </label>
        </div>
    );
};

const PosterUI: FC<{ label: string; }> = ({ label }) => {
    return (
        <div className="border border-dashed border-x-secondary-dark flex items-center justify-center rounded cursor-pointer aspect-video">
            <span>
                {label}
            </span>
        </div>
    );
};