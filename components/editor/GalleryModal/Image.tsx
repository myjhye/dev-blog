// 이미지

import CheckMark from '@/components/common/CheckMark';
import NextImage from 'next/image';

interface Props {
    src: string;
    selected?: boolean;
    onClick?(): void;
};

export default function Image({ src, selected, onClick }: Props) {
    return (
        <div
            onClick={onClick} 
            className='relative rounded overflow-hidden cursor-pointer'
        >
            <NextImage 
                src={src}
                width={200}
                height={200}
                alt='gallery'
                objectFit='cover'
                className='bg-secondary-light'
            />
            <div className='absolute top-2 left-2'>
                <CheckMark visible={selected || false} />
            </div>
        </div>
    )
}
