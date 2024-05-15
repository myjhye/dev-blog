import { ReactNode, useState } from "react"

interface Props {
    head: ReactNode;
    options: {
        label: string;
        onClick(): void
    }[];
}

export default function DropdownOptions({ head, options }: Props) {

    const [showOptions, setShowOptions] = useState(false);

    return (
        <button
            onBlur={() => setShowOptions(false)}
            onMouseDown={() => setShowOptions(!showOptions)} 
            className="relative"
        >
            {/* 선택한 옵션 이름 */}
            {head}

            {/* 선택 옵션 */}
            {showOptions && <div className="min-w-max absolute top-full mt-4 right-2 z-10 border-2 border-primary-dark dark:border-primary rounded text-left bg-primary dark:bg-primary-dark">
                <ul className="p-3 space-y-3">
                    {options.map(({ label, onClick }) => {
                        return (
                            <li
                                key={label} 
                                onMouseDown={onClick}
                            >
                                {label}
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </button>
    )
}