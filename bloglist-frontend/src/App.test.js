import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })
    describe('when user is not logged in', () => {

        it('when user is not logged, only the login form us shown', () => {

            const blogs = app.find(Blog)
            expect(blogs.length).toBe(0)
        })
    })
})