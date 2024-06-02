// SEO Section

import { ChangeEventHandler, FC, useState } from "react"

export default function SEOForm() {

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

        // 자른 meata 값으로 업데이트
        setValues({
            ...values,
            [name]: value
        });
    };

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
