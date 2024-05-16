import { BsLink45Deg } from "react-icons/bs";
import Button from "../ToolBar/Button";
import LinkForm, { linkOption } from "./LinkForm";
import { useState } from "react";

interface Props {
    onSubmit(link: linkOption): void;
}

export default function InsertLink({ onSubmit }: Props) {

    const [visible, setVisible] = useState(false);

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
            <Button onClick={() => setVisible(!visible)}>
                <BsLink45Deg />
            </Button>

            <div className="absolute top-full mt-4 right-0 z-50">
                {/* 부모 컴포넌트(ToolBar)로 링크 정보 전달 -> onSubmit */}
                <LinkForm 
                    visible={visible}
                    onSubmit={onSubmit} 
                />
            </div>
        </div>
    )
}