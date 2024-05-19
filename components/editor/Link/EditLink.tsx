// 링크 버튼 3개 - 링크 열기, 링크 편집, 링크 제거

import { BsBoxArrowUpRight, BsPencilSquare } from "react-icons/bs";
import { BiUnlink } from "react-icons/bi";
import { BubbleMenu, Editor } from "@tiptap/react";
import { useCallback } from "react";

interface Props {
    editor: Editor;
}

export default function EditLink({ editor }: Props) {

  // (1) - 링크 열기
  const handleOnLinkOpenClick = useCallback(() => {
    // 현재 선택된 링크의 href 속성 가져오기
    const { href } = editor.getAttributes('link');
    // 링크가 존재하면 해당 링크를 새로운 탭에서 열기
    if (href) {
        window.open(href, "_blank");
    }
  // editor가 변경될 때만 이 콜백 함수가 재생성
  }, [editor]);

  // (2) - 링크 편집
  const handleLinkEditClick = () => {};

  // (3) - 링크 제거
  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };

  return (
    <BubbleMenu
        shouldShow={({editor}) => {
            return editor.isActive('link');
        }} 
        editor={editor}
    >
      <div className="rounded bg-primary dark:bg-primary-dark text-primary-dark dark:text-primary shadow-secondary-dark shadow-md p-3 flex items-center space-x-6 z-50">
        {/* 링크 열기 버튼 */}
        <button onClick={handleOnLinkOpenClick}>
          <BsBoxArrowUpRight />
        </button>
        {/* 링크 편집 버튼 */}
        <button onClick={handleLinkEditClick}>
          <BsPencilSquare />
        </button>
        {/* 링크 제거 버튼 */}
        <button onClick={handleUnlinkClick}>
          <BiUnlink />
        </button>
      </div>
    </BubbleMenu>
  );
};
