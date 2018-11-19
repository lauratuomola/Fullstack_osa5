import React from 'react'

const BlogForm = ({create, title, handleFieldChange, author, url}) => (
    <div>

        <h2>create a new</h2>
        <form onSubmit={create}>
            <div>
                title:
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    name="author"
                    value={author}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    name="url"
                    value={url}
                    onChange={handleFieldChange}
                />
            </div>
            <button type="submit">create</button>
        </form>
    </div>
)

export default BlogForm