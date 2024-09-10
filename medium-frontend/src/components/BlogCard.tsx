import { Link } from "react-router-dom"

interface BlogCardProps {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}



export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {

    return <Link to={`/blog/${id}`}> 
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            {/* blog post avatar */}
            <Avatar size={"small"} name={authorName} />
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
            <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                <Circle />
            </div>

            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">{publishedDate}</div>
        </div>
        <div className="text-xl font-bold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {/* we can also add a if statement where we can define if the content > 100 only then add .... */}
            {content.slice(0, 100) + "...."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-2">
            {/* Calculate the Reading Time: */}
            {/* Divide the total number of words by the average reading speed. */}
            {/* average reading speed could be b/w 200 - 250 words per minute */}
            {`${Math.ceil(content.length / 200)} minute(s) read`}
        </div>

    </div>
    </Link>
}
// size = 6 is set to bea default size
// w-${size} h-{size} this is a dynamic styling an ugly way instead 
// use clsx by npm
// size? is set to optional 
export function Avatar({ name, size = "small" }: { name: string, size: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6" : "w-10 h-10"}`}>
        <span className={`${size === "small" ? "text-xs" :  "text-md"}text-xs font-thin text-gray-600 dark:text-gray-300`}>{wordCount(name)}</span>
    </div>
}

function wordCount(authorName: string): string | undefined {
    const name = authorName.trim();
    const words = name.split(/\s+/).filter(word => word.length > 0)
    const nameInitials = getLetter(words);
    return nameInitials;
}

function getLetter(nameArray: string[]): string | undefined {
    if (nameArray.length === 1) {
        return nameArray[0][0];
    }
    else if (nameArray.length > 1) {
        let b: string = "";
        for (let i = 0; i < 2; i++) {
            b += nameArray[i][0];;
        }
        console.log("this is b " + b);
        return b;
    }
    

}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
