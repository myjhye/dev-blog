// 이미지 선택 시 나타나는 체크 표시

import { BsCheckLg } from "react-icons/bs";

interface Props {
    visible: boolean
}

export default function CheckMark({ visible }: Props) {
    
    if (!visible) {
        return null;
    }
    
    return (
        <div className="bg-action p-2 text-primary rounded-full bg-opacity-70 backdrop-blur-sm">
            <BsCheckLg />
        </div>
    )
}