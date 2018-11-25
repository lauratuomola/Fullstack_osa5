import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({ handleFieldChange, handleSubmit, username, password, }) => (
    <div>
        <h2>log in to application</h2>
        <form onSubmit={handleSubmit}>
            <div>
                username:
        <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                password:
        <input
                    type="text"
                    name="password"
                    value={password}
                    onChange={handleFieldChange}
                />
            </div>
            <button type="submit">login</button>

        </form>

    </div>
)
LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

export default LoginForm