import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
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
        {this.state.user === null ?
          loginForm() :
          <div>
            <h2>blogs</h2>
            <p>{this.state.user.name} logged in</p>
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
