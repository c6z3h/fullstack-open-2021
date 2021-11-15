// const jwt = require('jsonwebtoken')
// const blogsRouter = require('express').Router()
// const User = require('../models/user')
// const Blog = require('../models/blog')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

// blogsRouter.get('/', async (request, response) => {
//     const blogs = await Blog.find({})
//       .populate('user', { username: 1, name: 1 })

//     response.json(blogs.map(blog => blog.toJSON()))
//   })
  
// blogsRouter.post('/', async (request, response, next) => {
    
//     const token = getTokenFrom(request)
//     const decodedToken = jwt.verify(token, process.env.SECRET)
//     if (!token || !decodedToken.id) {
//       return response.status(401).json({ error: 'token missing or invalid' })
//     }
//     const user = await User.findById(decodedToken.id)
//     const blog = new Blog({ ...request.body, user: user._id })

//     if (typeof blog.likes === 'undefined' || blog.likes === null) {
//       blog.likes = 0
//     }

//     if (typeof blog.title === 'undefined' || blog.title === null || typeof blog.url === 'undefined' || blog.url === null) {
//       response.status(400).json({ error: 'title or url is missing' })
//     } else {
//       const result = await blog.save()
//       user.blogs = user.blogs.concat(result._id)
//       await user.save()
//       response.status(201).json(result)
//     } // next(exception)
// })

// blogsRouter.delete('/:id', async (request, response) => {
//       try {
//           const blog = await Blog.findById(request.params.id)
//           await Blog.findByIdAndRemove(request.params.id)
//           response.status(204).end()
//       } catch (error) {
//           response.status(400).end()
//       }
// })
 
// blogsRouter.put('/:id', async (request, response) => {
//   const blog = {
//       likes: request.body.likes
//   }
//   try {
//       const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//       response.json(result.toJSON())
//   } catch (error) {
//       response.status(400).end()
//   }
// })

// module.exports = blogsRouter

const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url)
    return response.status(400).json({ error: 'title or url is missing' })

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const id = request.params.id
  const blog = await Blog.findById(id)
  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  }
  return response.status(401).json({
    error: 'Unauthorized to access the blog',
  })
})

module.exports = blogsRouter