import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable';


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
      this.setState({
        username: '',
        password: '',
        user,
        message: `user ${user.name} logged in`
      })
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
  create = (event) => {
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
      <Togglable buttonLabel="login">
        <LoginForm
          handleFieldChange={this.handleFieldChange}
           handleSubmit={this.login}
           username={this.state.username}
           password={this.state.password}
        />
      </Togglable>
    )

    const blogForm = () => {
      <Togglable buttonLabel="new blog" ref={component => this.blogForm=component}>
        <BlogForm
                create={this.create}
                handleFieldChange={this.handleFieldChange}
                author={this.state.author}
                title={this.state.title}
                url={this.state.url}
              />
      </Togglable>
    }


    return (
      <div>
        <Notification message={this.state.message} />
        {this.state.user === null ?

          loginForm()
          :
          <div>
            <h2>blogs</h2>
            <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
            {blogForm()}
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
