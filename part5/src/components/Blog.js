import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleRemoving, handleLikes }) => {
  const [showFull, setShowFull] = useState(false)

  const blogStyle = {
    // paddingLeft: 2,
    // paddingTop: 10,
    border: 'dotted',
    marginBottom: 8,
    borderWidth: 6,
  }

  const showFullBlog = () => {
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          {blog.likes}{' '}
          <button className='like' onClick={() => handleLikes(blog.id, blog.likes)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button className='remove' onClick={() => handleRemoving(blog)}>Remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <i>{blog.author}</i>
      <button onClick={() => setShowFull(!showFull)}>
        {showFull ? 'hide' : 'view'}
      </button>
      {showFull && showFullBlog()}
    </div>
  )
}

Blog.propTypes = {
  setUpdate: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
  }),
}

export default Blog