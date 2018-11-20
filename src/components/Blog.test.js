import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
it('after clicking name the details are displayed', () => {
    const blog = {
        title: "blog's title",
        author: "blog's author",
        url: "www.fi",
        likes: 99
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} onClick={mockHandler} />)
    const nameDiv = blogComponent.find('.name')
    expect(nameDiv.text()).toContain(blog.title)
    expect(nameDiv.text()).toContain(blog.author)
    nameDiv.simulate('click')


    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.text()).toContain(blog.url)
    expect(contentDiv.text()).toContain(blog.likes)
  })
})
