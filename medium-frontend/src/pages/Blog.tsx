
// atomFamilies/selectorFamiilies 
// what happns in medium site
// when a bulk req is sent all the blogs gets fetched 
// also when u click on a single blog again a fecth req is sent
// but the second time u clicked on the same blog it wont re-fetch the blogs againg
// instead it stores them somewhere 
// here comes the use case of recoil

import { useParams } from 'react-router-dom';
import { FullBlog } from '../components/FullBlog';
import { useBlog } from "../hooks";
import { Spinner } from '../components/Spinner';



// to simply kick things off we are first creating a hook and storing em in a state i guess
export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });
    if (loading || !blog) {
        return <div className= "h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <Spinner />
            </div>
            {/* //we can add spinner but it a  dumb thing to add lets see how we can add it */}
            {/* use skeletons over spinner */}
            
        </div>
    }

    if (!blog) {
        return <div>Blog not found.</div>;
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}