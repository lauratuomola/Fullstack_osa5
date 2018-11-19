import React from 'react'
import '../styles/index.css'

const BlogInfo = ({blog, username}) => (
  <div>
    {blog.url} <br />
    {blog.likes} likes <button>like</button><br />
    Added by {username}
  </div>  
)

export default BlogInfo