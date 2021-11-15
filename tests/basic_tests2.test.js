const listHelper = require('../utils/list_helper')

describe('basic tests 2', () => {
    const emptyList = []

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Hell',
            author: 'Edgar Allen Poe',
            url: 'https://google.com',
            likes: 5,
            __v: 0
          }
    ]

    const listWithTwoBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Hell',
          author: 'Edgar Allen Poe',
          url: 'https://google.com',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 21,
            __v: 0
          }
      ]
  
    test('favourite blog: empty list, returns 0', () => {
      const result = listHelper.favouriteBlog(emptyList)
      expect(result).toEqual(0)
    })

    test('favourite blog: list.length === 1', () => {
      const result2 = listHelper.favouriteBlog(listWithOneBlog)
      // console.log(result2)
      expect(result2).toEqual(
          {_id: '5a422aa71b54a676234d17f8',
            title: 'Go To Hell',
            author: 'Edgar Allen Poe',
            url: 'https://google.com',
            likes: 5,
            __v: 0
      })
    })

    test('favourite blog: list.length === 2', () => {
      const result3 = listHelper.favouriteBlog(listWithTwoBlog)
      expect(result3).toEqual({
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 21,
        __v: 0
      })
    })

    test('total likes: empty list, returns 0', () => {
      const result = listHelper.totalLikes(emptyList)
      expect(result).toBe(0)
    })

    test('total likes: list.length === 1', () => {
      const result2 = listHelper.totalLikes(listWithOneBlog)
      // console.log(result2)
      expect(result2).toBe(5)
    })

    test('total likes: list.length === 2', () => {
      const result3 = listHelper.totalLikes(listWithTwoBlog)
      expect(result3).toBe(26)
    })
  })