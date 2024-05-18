import { useState } from "react";

interface Props {
    visible: boolean;
    onSubmit(link: linkOption): void;
}

export type linkOption = {
    url: string;
    openInNewTab: boolean;
}

// 주어진 url을 유효한 url 형식으로 변환
export const validateUrl = (url: string) => {

    if (!url.trim()) {
        return ""
    }

    let finalUrl;

    try {
        // 입력된 문자열이 유효한 url인지 확인
        finalUrl = new URL(url).toString();
    } catch (error) {
        // 유효하지 않은 경우 'http://'를 추가해 유효한 url로 변환
        finalUrl = 'http://' + url
    }
    // 변환된 최종 url 변환
    return finalUrl
}

export default function LinkForm({ visible, onSubmit }: Props) {

    const [link, setLink] = useState<linkOption>({
        url: '',
        openInNewTab: false,
    });

    const handleSubmit = () => {
        // 부모 컴포넌트(InsertLink)로 링크 정보 전달
        onSubmit({
            ...link,
            // url만 변환된 값으로 덮어 쓰기
            url: validateUrl(link.url)
        });
        // 폼 초기화
        resetForm();
    }

    // 폼 초기화
    const resetForm = () => {
        setLink({
            url: '',
            openInNewTab: false,
        });
    }

    if (!visible) {
        return null;
    }

    return (
        <div className="rounded p-2 bg-primary dark:bg-primary-dark shadow-sm shadow-secondary-dark">
            <input
                autoFocus 
                type="text"
                className="bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary"
                placeholder="https://example.com"
                value={link.url}
                onChange={({ target }) => setLink({
                    ...link,
                    // url 속성 업데이트
                    url: target.value,
                })}
            />
            
            <div className="flex items-center space-x-2 mt-2">
                <input 
                    type="checkbox"
                    id="open-in-new-tab"
                    checked={link.openInNewTab}
                    onChange={({ target }) => setLink({
                        ...link,
                        // openInNewTab 속성 업데이트
                        openInNewTab: target.checked,
                    })}
                />
                <label 
                    htmlFor="open-in-new-tab"
                    className="whitespace-nowrap"
                >
                    open in new tab
                </label>
                
                <div className="flex-1 text-right">
                    <button
                        onClick={handleSubmit} 
                        className="bg-action px-2 py-1 text-primary rounded text-sm"
                    >
                        Apply
                    </button>
                </div>
            </div>    
        </div>
    )
}