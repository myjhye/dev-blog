// 아이템 전역적 표시 -> 네비게이션 바, 게시물 생성 버튼
// 본문 -> children

import { ReactNode } from "react";
import AdminNav from "../common/AdminNav";
import { AiOutlineDashboard, AiOutlineContainer, AiOutlineTeam, AiOutlineMail, AiOutlineContacts, AiOutlineFileAdd } from "react-icons/ai"; 
import Link from "next/link";
import AppHead from "../common/AppHead";

interface Props {
    children: ReactNode
    title?: string
}

const navItems = [
    { href: "/admin", icon: AiOutlineDashboard, label: "Dashboard" },
    { href: "/admin/posts", icon: AiOutlineContainer, label: "Posts" },
    { href: "/admin/users", icon: AiOutlineTeam, label: "Users" },
    { href: "/admin/comments", icon: AiOutlineMail, label: "Comments" },
    { href: "/admin/contact", icon: AiOutlineContacts, label: "Contact" },
];

export default function AdminLayout({ title, children }: Props): JSX.Element {
    return (
        <>
            <AppHead title={title} />
            <div className="flex">
                {/* 네비게이션 바 */}
                <AdminNav navItems={navItems} />
                
                {/* 본문 */}
                <div className="flex-1 p-4">
                    {children}
                </div>

                {/* 게시물 생성 버튼 */}
                <Link href='/admin/post/create' legacyBehavior>
                    <a className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition">
                        <AiOutlineFileAdd size={24} />
                    </a>
                </Link>
            </div>
        </>
    );
}