import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [blogData, setBlogData] = useState();
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: ""
  });




  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };
//   console.log(blog);





  useEffect(() => {
    setName(localStorage.getItem("loggedInUser"));
    setUid(localStorage.getItem("id"));
  }, []);





  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };





  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/blogs", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setBlogData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [blogData]);


  


  const submitBlog = async (e)=>{
    e.preventDefault();
    const blogWithUid = {...blog , uid:uid };     // add the user ID to the blog data
    try {
        const res = await axios.post('/blogs' , blogWithUid)
        setBlog({title: "", category: "", content: ""})
    } catch (error) {
      console.log(error);
    }
  }





  return (
    <div>
      THIS IS HOME
      <span className=" p-8 text-2xl">{name} </span>
      <button
        className="p-4 border-2 border-black cursor-pointer bg-slate-200"
        onClick={logout}
      >
        LogOut
      </button>
      <div className="grid grid-flow-col grid-cols-3 mt-10  text-center">
        {blogData &&
          blogData?.map((blog, index) => {
            return (
              <ul key={index} className="text-xl p-4 m-2">
                <li>{blog.title}</li>
                <li>{blog.category}</li>
                <li>{blog.content}</li>
              </ul>
            );
          })}
      </div>

      <form className="space-y-4 md:space-y-6 m-8" onSubmit={submitBlog}>
        <div className="">
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          > Title</label>
          <input
            onChange={handleChange}
            type="text" name="title" id="title" required
            value={blog.title}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          > Category</label>
          <input
            onChange={handleChange}
            type="text" name="category" id="category" required
            value={blog.category}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
            <label htmlFor="content">Content</label>
            <textarea name="content" id="content" value={blog.content} onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                
            </textarea>
        </div>

        <button className="border-2 border-black p-2 text-xl">Submit</button>

      </form>
      
    </div>
  );
}

export default Home;
