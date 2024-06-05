import Editor from "@/components/editor";

export default function Create() {
    return (
        <div className="max-w-4xl mx-auto">
            <Editor onSubmit={(post) => {
                console.log(post)
            }}/>
        </div>
    )
}