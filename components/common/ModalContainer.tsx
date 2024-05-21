// 모달 창

import { MouseEventHandler, ReactNode, useCallback, useEffect, useId } from "react";

export interface ModalProps {
    visible?: boolean;
    children: ReactNode;
    onClose?(): void;
};

interface Props extends ModalProps {
    children: ReactNode;
};

export default function ModalContainer({ visible, children, onClose }: Props) {

    // 고유 id 
    const containerId = useId();

    // 모달 닫기, useCallback으로 메모이제이션
    const handleClose = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    // 모달 외부 클릭 시 모달 닫기
    const handleClick:MouseEventHandler<HTMLDivElement> = (e: any) => {
        if (e.target.id === containerId) {
            handleClose();
        }
    };

    useEffect(() => {
        // 'Escape' 누르면 모달 닫기
        const closeModal = (e: any) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        // 'Escape' 누르면 모달 닫는 'keydown' 이벤트 리스너 추가
        document.addEventListener('keydown', closeModal);

        // 컴포넌트 언마운트 시(페이지 닫으면) 이벤트 리스너 제거
        return () => {
            document.removeEventListener("keydown", closeModal);
        }
    }, [handleClose]);

    // 모달이 안 보이면 null
    if (!visible) {
        return null;
    }

    return (
        // 모달 외부 영역
        <div
            id={containerId}
            onClick={handleClick} 
            className="fixed inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] z-50 flex items-center justify-center"
        >
            { children }
        </div>
    )
}