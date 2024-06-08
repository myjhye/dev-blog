import Head from "next/head";

interface Props {
    title?: string
    desc?: string
};

export const APP_NAME = 'Dev Blogs'

export default function AppHead({ title, desc }: Props) {
    return (
        <Head>
            <title>
                {title ? (
                    title + " | " + APP_NAME
                ): APP_NAME}
            </title>
            <meta 
                content={desc}
                name="description"
            />
        </Head>
    )
}
