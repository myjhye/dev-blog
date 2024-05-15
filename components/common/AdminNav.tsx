// 네비게이션 바
// - 가시성 토글
// - 가시성 상태 로컬스토리지에 저장해 상태 유지

import Link from "next/link";
import Logo from "./Logo";
import { IconType } from 'react-icons'
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

interface Props {
    navItems: {
        label: string; 
        icon: IconType;
        href: string; 
    }[];
}

export default function AdminNav({ navItems }: Props): JSX.Element {

    const [isNavVisible, setIsNavVisible] = useState(false);

    const navRef = useRef<HTMLElement>(null);

    // nav 가시성 변경 (nav width 변경)
    const toggleNav = (shouldHideNav: boolean) => {

        if (!navRef.current) {
            return;
        }

        if (shouldHideNav) {
            // hide nav
            // width를 60 -> 12 변경
            navRef.current.classList.remove('w-60');
            navRef.current.classList.add('w-12');
        }
        else {
            // show nav
            // width를 12 -> 60 변경
            navRef.current.classList.add('w-60');
            navRef.current.classList.remove('w-12');
        }
    };

    // nav 가시성 변경 -> 로컬 스토리지에 변경한 상태 저장
    const updateNavState = () => {
        // nav 가시성 변경
        toggleNav(isNavVisible);
        // nav text 가시성 변경
        setIsNavVisible(!isNavVisible);
        // 로컬 스토리지에서 현재 가시성 반대 상태 저장
        localStorage.setItem('nav-visibility', JSON.stringify(!isNavVisible));
    }

    // 로컬 스토리지에서 nav 가시성 상태 가져오기 (초기 마운트 시)
    useEffect(() => {
        const navState = localStorage.getItem('nav-visibility')
        if (navState !== null) {
            const newState = JSON.parse(navState)
            setIsNavVisible(newState);
            toggleNav(!newState);
        }
        else {
            // 로컬 스토리지에 저장된 상태 없으면 nav 보이기
            setIsNavVisible(true);
        }
    }, []);

    return (
        <nav
            ref={navRef} 
            className='h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0'
        >
            <div>
                {/* logo */}
                <Link href="/admin" legacyBehavior>
                    <a className="flex item-start space-x-2 p-3 mb-10">
                        <Logo className="fill-hightlight-light fill-hightlight-dark w-5 h-5" />
                        {isNavVisible && 
                            <span className="fill-hightlight-light fill-hightlight-dark text-xl font-semibold">
                                Admin
                            </span>
                        }
                    </a>
                </Link>

                {/* nav items */}
                <div className="space-y-6">
                    {navItems.map((item) => {
                        return (
                            <Link href={item.href} key={item.href} legacyBehavior>
                                <a className="flex items-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition">
                                    <item.icon size={24} />
                                    {isNavVisible && 
                                        <span className="ml-2">{item.label}</span>
                                    }
                                </a>
                            </Link>
                        );
                    })}
                </div>
            </div>
            

            {/* nav toggler (button) */}
            <button
                onClick={updateNavState} 
                className="text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition self-end"
            >
                {isNavVisible 
                    ? <RiMenuFoldFill size={25} /> 
                    : <RiMenuUnfoldFill size={25} />
                }
            </button>

        </nav>
    );
}
