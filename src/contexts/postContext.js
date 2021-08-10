import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const PostContext = React.createContext()

export function usePostContext() {
  return useContext(PostContext)
}

export function PostProvider({ children }) {
  const [Posts, setPosts] = useState()
  const [loading, setLoading] = useState(false)
  const [filteredPosts, setFiltered] = useState()


  const setPost = (data) => {
    setPosts(data)
    setFiltered(data)
  }
  const search = (value) => {
    console.log(value)
    let data = Posts.filter((item) => {
      return value ? item.post.caption?.toLowerCase().includes(value?.toLowerCase()) || item.post.userName?.toLowerCase().includes(value?.toLowerCase()) : true
    })
    setFiltered(data)
  }


  const value = {
    filteredPosts,
    setPost,
    search
  }

  return (
    <PostContext.Provider value={value}>
      {!loading && children}
    </PostContext.Provider>
  )
}
