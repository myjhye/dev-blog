import Editor from "@/components/editor";
import AppHead from "@/components/common/AppHead";

export default function Create() {
    return (
        <>
            <AppHead title="New Post" />
            <div className="max-w-4xl mx-auto p-4">
                <Editor 
                    onSubmit={(post) => {
                        console.log(post);
                    }}
                />
            </div>
        </>
    );
}
