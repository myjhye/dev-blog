import Editor from "@/components/editor";

export default function Create() {
    return (
        <div className="max-w-4xl mx-auto">
            <Editor 
                onSubmit={(post) => {
                    console.log(post)
                }}
                initialValue={{
                    title: "This is from create",
                    meta: "Little meta description",
                    content: "<h1>I am header</h1>",
                    slug: "this-is-from-create",
                    tags: "javascript",
                    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzcP9jydrP4-aSdHPiDvfS5r2agDYZii-E-g&s"
                }}
            />
        </div>
    )
}