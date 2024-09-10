import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const AppBar = () => {
    return <div className="border-b flex justify-between px-10 py-4">

        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
            Medium</Link>

        <div>
            {/* //button to add a blog */}
            <Link to={'/publish'}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800
             focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 
             py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">add a blog</button>
            </Link>

            {/* here we need to store users details so recoil will come into picture here we will store user details somewhere in the store
            so that our component can also get it */}
            {/* app bar avatar */}
            <Avatar size={"big"} name="drishti tanwar" />
        </div>

    </div>
}