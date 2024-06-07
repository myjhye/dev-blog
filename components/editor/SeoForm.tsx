// SEO Section

import { ChangeEventHandler, FC, useEffect, useState } from "react"
import slugify from "slugify";

export interface SeoResult {
    meta: string;
    slug: string;
    tags: string;
};

interface Props {
    initialValue?: SeoResult;
    title?: string;
    // SeoResult 타입을 인자로 받는 onChange 함수
    onChange(result: SeoResult): void;
};

export default function SEOForm({
    initialValue,
    title = "",
    onChange, 
}: Props) {
    // 메타설명, 슬러그, 태그
    const [values, setValues] = useState({
        meta: '',
        slug: '',
        tags: '',
    });

    // 입력 값 변경
    const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
        let { name, value } = event.target;

        // meta 값 최대 150자 자르기
        if (name === 'meta') {
            value = value.substring(0, 150)
        }

        const newValues = {
            ...values,
            [name]: value,
        };

        setValues(newValues);
        // 변경된 값 부모 컴포넌트에 전달
        onChange(newValues);
    };

    useEffect(() => {
        const slug = slugify(title.toLocaleLowerCase())
        const newValues = {
            ...values,
            slug
        };
        setValues(newValues);
        // 변경된 값 부모 컴포넌트에 전달
        onChange(newValues);
    }, [title]);

    useEffect(() => {
        if (initialValue) {
            setValues({ 
                ...initialValue,
                slug: slugify(initialValue.slug) 
            })
        }
    }, [initialValue]);

    return (
        <div className="space-y-4">
            <h1 className="text-primary-dark dark:text-primary text-xl font-semibold">
                SEO Section
            </h1>
            {/* 슬러그 */}
            <Input 
                name="slug"
                value={values.slug}
                placeholder="slug-goes-here"
                label="Slug: "
                onChange={handleChange}
            />
            {/* 태그 */}
            <Input 
                name="tags"
                value={values.tags}
                placeholder="React, Next JS"
                label="Tags: "
                onChange={handleChange}
            />
            {/* 메타설명 */}
            <div className="relative">
                <textarea 
                    name="meta"
                    className="w-full bg-transparent outline-none border-2
                    border-secondary-dark focus:border-primary-dark
                    focus:dark:border-primary rounded transition text-primary-dark 
                    dark:text-primary text-lg h-20 resize-none p-2 box-border"
                    value={values.meta}
                    placeholder="Meta description 150 characters will be fine"
                    onChange={handleChange}
                />
                <p className="absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm">
                    {values.meta.length}/150
                </p>
            </div>
        </div>
    )
};


// 슬러그, 태그 입력 필드 재사용
const Input: FC<{
    name?: string;
    value?: string;
    placeholder?: string;
    label?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>
}> = ({ name, value, placeholder, label, onChange }) => {
    return (
        <label className="block relative w-full">
            {/* 레이블 */}
            <span className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2">
                { label }
            </span>
            {/* 입력 필드 */}
            <input 
                type="text"
                name={name}
                value={value}
                placeholder={placeholder}
                className="w-full bg-transparent outline-none border-2
                border-secondary-dark focus:border-primary-dark
                focus:dark:border-primary rounded transition text-primary-dark 
                dark:text-primary py-2 pl-12 box-border"
                onChange={onChange}
            />
        </label>
    )
}
