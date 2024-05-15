// 툴바 -> Paragraph, Heading 1, 2, 3

import DropdownOptions from "@/components/common/DropdownOptions";
import { Editor } from "@tiptap/react"
import { AiFillCaretDown } from "react-icons/ai";

interface Props {
    editor: Editor | null;
}

export default function ToolBar({ editor }: Props) {

    if (!editor) {
        return null;
    }

    {/* 선택 옵션 */}
    const options=[
        { 
            label: "Paragraph", 
            onClick: () => editor.chain().focus().setParagraph().run()
        },
        { 
            label: "Heading 1", 
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run()
        },
        { 
            label: "Heading 2", 
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run()
        },
        { 
            label: "Heading 3", 
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run()
        },
    ];

    const getLabel = (): string => {
        
        if (editor.isActive('heading', { level: 1 })) return "Heading 1";
        if (editor.isActive('heading', { level: 2 })) return "Heading 2";
        if (editor.isActive('heading', { level: 3 })) return "Heading 3";
        
        return "Paragraph"
    }

    {/* 선택한 옵션 이름 */}
    const Head = () => {
        return (
            <div className="flex items-center space-x-2 text-primary-dark dark:text-primary">
                <p>{ getLabel() }</p>
                <AiFillCaretDown />
            </div>
        )
    }

    return (
        <div>
            {/* paragragh, heading 1, 2, 3 */}
            <DropdownOptions 
                options={options}
                head={ <Head /> }
            />
        </div>
    )
}