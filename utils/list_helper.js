// npm test -- -t 'total likes'

// Functions here
const dummy = (blogs) => {
    if (blogs !== null){
        return 1
    } 
    return -1
  }

const totalLikes = (blogs) => {
    // const reducer = (total, current) => {
    //     (total + current.likes, 0)
    // }
    return blogs.reduce((total, current) => total + current.likes, 0)
    // return blogs.reduce(reducer)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0){
        return 0
    }
    const likes = blogs.map(blog => blog.likes)
    const index = likes.indexOf(Math.max(...likes))
    return blogs[index]
    // const max_index = Math.max.apply(Math, blogs.map(function(o) { return o.likes; }))
    // console.log(max_index)
    // return blogs[max_index]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return 0
    }
    const authors = blogs.map(blog => blog.author)
    const count = new Array(authors.length).fill(0)
    blogs.map(blog =>
        count[authors.indexOf(blog.author)] += 1
    )
    
    let index = count.indexOf(Math.max(...count))
    
    return {
        author: authors[index],
        blogs: count[index]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return 0
    }
    const authors = blogs.map(blog => blog.author)
    const count = new Array(authors.length).fill(0)
    blogs.map(blog =>
        count[authors.indexOf(blog.author)] += blog.likes
    )
    
    let index = count.indexOf(Math.max(...count))
    
    return {
        author: authors[index],
        likes: count[index]
    }
}

module.exports = {
dummy,
totalLikes,
favouriteBlog,
mostBlogs,
mostLikes,
}