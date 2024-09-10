import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>
            <AppBar />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    return <div>
        <AppBar />

        <div className="flex justify-center">
            <div className="">
                {blogs.map(blog =>
                    // error : Property 'author' does not exist on type 'never'.
                    // solution: addd interface for better types of useBlog
                    // added : <Blog[]> interface to useState<Blog[]> in useBlog() hook;


                    // error : cannot read properties of null
                    //solution : in case of if author doenst have name 
                    //add : authorName={blog.author.name || "Anonymous"}
                    <BlogCard
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={"29 August 2024"}
                    />)}
                {/* we need to fetch all the blogs and maybe put them in recoil state or here directly */}
                {/* we can store it in a state */}
                {/* we can store it in a context variable */}
                {/* we can store it here directly */}
                {/* create our own custom hook */}
                {/* no need to use recoil for a simple app  */}
                {/* but if these blogs are used in 10 different places then we would have stored it in recoil */}
                {/* <BlogCard
                    authorName={"drishti"}
                    title={"Attack on pluto an attack by cat"}
                    content={"A cat recently attacked on pluto , how a cat would reach pluto ? was she a cat or a dog ? if she a dog then why she mewoed ? then what is pluto ? a ball or a planet ?"}
                    publishedDate={"29 August 2024"}
                /> */}

            </div></div>
    </div>

}