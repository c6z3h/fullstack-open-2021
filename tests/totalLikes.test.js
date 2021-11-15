const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const emptyList = []

    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithTwoBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
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
  
    test('when list has no blog, returns 0', () => {
      const result = listHelper.totalLikes(emptyList)
      expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
      const result2 = listHelper.totalLikes(listWithOneBlog)
      console.log(result2)
      expect(result2).toBe(5)
    })

    test('when list has 2 blog, equals the likes of that', () => {
      const result3 = listHelper.totalLikes(listWithTwoBlog)
      expect(result3).toBe(26)
    })
  })