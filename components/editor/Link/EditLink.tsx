// 링크 버튼 3개 - 링크 열기, 링크 편집, 링크 제거

import { BsBoxArrowUpRight, BsPencilSquare } from "react-icons/bs";
import { BiUnlink } from "react-icons/bi";
import { BubbleMenu, Editor } from "@tiptap/react";
import { useCallback, useState } from "react";
import LinkForm, { linkOption } from "./LinkForm";

interface Props {
    editor: Editor;
}

export default function EditLink({ editor }: Props) {

  // LinkForm 표시 여부
  const [showEditForm, setShowEditForm] = useState(false);
  // LinkForm 초기 상태
  const [initialLinkState, setInitialLinkState] = useState<linkOption | undefined>();



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
  const handleLinkEditClick = () => {
    const { href, target } = editor.getAttributes('link');
    setInitialLinkState({
      url: href,
      openInNewTab: target === '_blank'
    });

    setShowEditForm(true);
  };




  // (3) - 링크 제거
  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };


  // LinkForm에서 링크 정보 제출
  const handleLinkFormSubmit = (link: linkOption) => {
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: link.url,
        target: link.openInNewTab ? '_blank' : ''
      })
      .run();

    setShowEditForm(false);
  }



  return (
    <BubbleMenu
        shouldShow={({editor}) => {
            // 현재 에디터에 링크가 활성화 되어 있는지 확인
            return editor.isActive('link');
        }} 
        editor={editor}
    >
      <LinkForm 
        visible={showEditForm}
        onSubmit={handleLinkFormSubmit}
        initialState={initialLinkState} 
      />

      {!showEditForm && (
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
      )}
    </BubbleMenu>
  );
};
