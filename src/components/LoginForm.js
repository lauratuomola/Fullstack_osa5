import React from 'react'

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

export default LoginForm