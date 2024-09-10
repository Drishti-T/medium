import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return <div>

        <div role="status" className="animate-pulse">
            <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">
                    {/* blog post avatar */}
                    {/* <Avatar size={"small"} name={authorName} /> */}
                    <div className="h-4 w-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                    {/* <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div> */}
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                        <Circle />
                    </div>

                    <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                        {/* {publishedDate} */}

                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                    </div>
                </div>
                <div className="text-xl font-bold pt-2">
                    {/* {title} */}
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                </div>
                <div className="text-md font-thin">
                    {/* we can also add a if statement where we can define if the content > 100 only then add .... */}
                    {/* {content.slice(0, 100) + "...."} */}
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                </div>
                <div className="text-slate-400 text-sm font-thin pt-2">
                    {/* Calculate the Reading Time: */}
                    {/* Divide the total number of words by the average reading speed. */}
                    {/* average reading speed could be b/w 200 - 250 words per minute */}

                    {/* {`${Math.ceil(content.length / 200)} minute(s) read`} */}
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                </div>

            </div>
         
            <span className="sr-only">Loading...</span>
        </div>



    </div>
} 