// youtube 버튼

import { BsYoutube } from "react-icons/bs";
import Button from "../ToolBar/Button";
import { useState } from "react";

interface Props {
    onSubmit(link: string): void;
}

export default function EmbedYoutube({ onSubmit }: Props) {

    const [url, setUrl] = useState("");
    const [visible, setVisible] = useState(false);

    // url 제출
    const handleSubmit = () => {
        // url 비어 있으면 폼 숨김
        if (!url.trim()) {
            return hideForm();
        }
        onSubmit(url);
        setUrl('');
        hideForm();
    };

    // 폼 숨김
    const hideForm = () => setVisible(false);

    return (
        <div 
            className="relative"
            // 'esc' 누르면 닫힘
            onKeyDown={({ key }) => {
                if (key === 'Escape') {
                    setVisible(false);
                }
            }}
        >
            {/* 유튜브 버튼 클릭 시 입력 폼 토글 */}
            <Button onClick={() => setVisible(!visible)}>
                <BsYoutube />
            </Button>

            {/* 입력 폼 */}
            {visible && (
                <div className="absolute top-full mt-4 right-0 z-50">
                    <div className="flex space-x-2">
                        {/* url 입력 필드 */}
                        <input
                            autoFocus 
                            type="text"
                            className="bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary"
                            placeholder="https://youtube.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {/* embed 버튼 */}
                        <button
                            onClick={handleSubmit} 
                            className="bg-action p-2 text-primary rounded text-sm"
                        >
                            Embed
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}