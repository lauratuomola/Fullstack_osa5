import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    const blog = {
      title: "blog's title",
      author: "blog's author",
      likes: 99
    }
  it('renders content', () => {

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const headerDiv = blogComponent.find('.content')
    const likesDiv = blogComponent.find('.likes')

    expect(likesDiv.text()).toContain(blog.likes)
  })
  it('clicks like button two times', () => {
    const mockHandler = jest.fn()

    const blogComponent = shallow(
        <SimpleBlog
          blog={blog}
          onClick={mockHandler}
        />
      )
    
      const button = blogComponent.find('button')
      button.simulate('click')
      button.simulate('click')
    
      expect(mockHandler.mock.calls.length).toBe(2)
  })
})