import React from 'react'
import '../styles/index.css'

const Blog = ({blog, handleClick}) => (
  <div >
    {blog.title}: {blog.author}
  </div>  
)

export default Blog