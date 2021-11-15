const { expect } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 5 people', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
test('the blog list contains this', async () => {
    const response = await api.get('/api/blogs')

    // expect(response.body[0].title).toBe('Type Wars')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        "TDD harms architecture"
  )
})

test('all blog entries have an ID', async() => {
    const response = await api.get('/api/blogs')
    // const id = new Array(blogs.length)
    // blogs.map(blog =>
    //     id[blog.id
    //     )
    expect(response.body[0].id).toBeDefined()
})

test('POST test', async() => {
    let blog = new Blog(initialBlogs[0])
    try{
    const result = await blog.save()
    response.status(201).json(result)
    } catch(exception) {
    // next(exception)
    console.log(exception)
    }

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('if blog added with 0 likes, fail test', async () => {
    const newBlog = {
        title: "Jordan Peterson",
        author: "JordanBPeterson",
        url: "https://jordanbpeterson.com/"
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)

    expect(response.body.likes).toBeDefined()
})

test('if blog is added with no url or title it will not be added', async () => {
    const newBlog = {
        author: null,
        url: "https://stack.com/",
        likes: 1
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)

    expect(response.status).toBe(400)
})

test('DELETE by ID', async () => {
    // const newBlog = {
    //     author: null,
    //     url: "https://stack.com/",
    //     likes: 1
    // }

    // const response = await api
    //     .post('/api/blogs')
    //     .send(newBlog)

    // expect(response.status).toBe(400)
})

test('UPDATE by ID', async () => {
    // const newBlog = {
    //     author: null,
    //     url: "https://stack.com/",
    //     likes: 1
    // }

    // const response = await api
    //     .post('/api/blogs')
    //     .send(newBlog)

    // expect(response.status).toBe(400)
})

afterAll(() => {
  mongoose.connection.close()
})