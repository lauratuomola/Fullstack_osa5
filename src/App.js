import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      blog: null,
      user: null,
      message: null
    }
  }
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', 
      password: '', 
      user,  
      message: `user ${user.name} logged in`})
      setTimeout(() => {
        this.setState({ message: null })
      }, 3000)
    } catch (exception) {
      this.setState({
        message: 'wrong username or password',
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 3000)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }
  logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }
  create = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: '',
          message: `a new blog: ${blogObject.title}, by: ${blogObject.author} was added`
        })
        setTimeout(() => {
          this.setState({ message: null })
        }, 5000)
      })
      
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={this.login}>
          <div>
            username:
          <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            password:
          <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">login</button>

        </form>

      </div>

    )

    return (
      <div>
        <Notification message={this.state.message}/>
        {this.state.user === null ?

          loginForm() :
          <div>
            <h2>blogs</h2>
            <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
            <h2>create a new</h2>
            <form onSubmit={this.create}>
              <div>
                title:
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div>
                author:
                <input
                  type="text"
                  name="author"
                  value={this.state.author}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div>
                url:
                <input
                  type="text"
                  name="url"
                  value={this.state.url}
                  onChange={this.handleFieldChange}
                />
              </div>
              <button type="submit">create</button>
            </form>

            {this.state.blogs.map(blog =>
              <Blog key={blog._id} blog={blog} />
            )}
          </div>
        }

      </div>
    );
  }
}

export default App;
