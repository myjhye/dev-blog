import { ChangeEventHandler, FC } from "react"

export default function SEOForm() {
    return (
        <div className="space-y-4">
            <h1 className="text-primary-dark dark:text-primary text-xl font-semibold">
                SEO Section
            </h1>
            
            <Input 
                name="slug"
                placeholder="slug-goes-here"
                label="Slug: "
            />
            <Input 
                name="tags"
                placeholder="React, Next JS"
                label="Tags: "
            />

            <textarea 
                className="w-full bg-transparent outline-none border-2
                border-secondary-dark focus:border-primary-dark
                focus:dark:border-primary rounded transition text-primary-dark 
                dark:text-primary text-lg h-20 resize-none p-2 box-border"
                placeholder="Meta description"
            />
        </div>
    )
};

const Input: FC<{
    name?: string;
    value?: string;
    placeholder?: string;
    label?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>
}> = ({ name, value, placeholder, label, onChange }) => {
    return (
        <label className="block relative w-full">
            <span className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2">
                { label }
            </span>
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
