
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { Publish } from "./pages/Publish";


function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/blog/:id" element={<Blog />}></Route>
        <Route path="/publish" element={<Publish />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;