import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('when user is not logged, only the login form us shown', () => {

    const blogs = app.find(Blog)
    expect(blogs.length).toBe(0)
  })
})