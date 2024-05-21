import { ReactNode } from "react";

export interface ModalProps {
    visible?: boolean;
    children: ReactNode;
    onClose?(): void;
};

interface Props extends ModalProps {
    children: ReactNode;
};

export default function ModalContainer({ visible, children, onClose }: Props) {

    if (!visible) {
        return null;
    }

    const handleClick = () => {
        onClose && onClose();
    }

    return (
        <div
            onClick={handleClick} 
            className="fixed inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] z-50 flex items-center justify-center"
        >
            { children }
        </div>
    )
}