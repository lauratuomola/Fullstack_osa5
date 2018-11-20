import React from 'react'
import '../styles/index.css'
import PropTypes from 'prop-types'


class Blog extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  render() {
    const {blog }= this.props
    const adder = blog.user ? blog.user.name : 'anonym'
    if (this.state.visible === true) {
      return (
        <div className="blog">
          <div
            className='name'
            onClick={() => this.setState({ visible: !this.state.visible })}
          >
            {blog.title} : {blog.author}
          </div>
          <div className='content'>
            {blog.url} <br />
            {blog.likes} likes <button>like</button><br />
            Added by {adder}
          </div>
        </div>
      )
    } else {
      return (
        <div className="blog">
          <div
            className='name'
            onClick={() => this.setState({ visible: !this.state.visible })}
          >
            {blog.title} : {blog.author}
          </div>
        </div>
      );
    }
  }
}
Blog.propTypes ={
  blog: PropTypes.object.isRequired
}

export default Blog