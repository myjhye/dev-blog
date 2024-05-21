import ModalContainer from "@/components/common/ModalContainer";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

interface Props extends ModalProps {
    children?: React.ReactNode;
}

export default function GalleryModal({ visible, onClose, children }: Props) {
    return (
        <ModalContainer 
            visible={visible}
            onClose={onClose}
        >
            <div className="bg-black p-20">
                <button className="bg-white p-3">
                    click
                </button>
                {children}
            </div>
        </ModalContainer>
    )
}
