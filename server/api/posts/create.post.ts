import { PrismaClient } from '@prisma/client'

// Interface for User
interface IUser {
  name: string
  email: string
  posts?: IPost[]
}

// Interface for Post
interface IPost {
  title: string
  content: string
  published: boolean
  author?: IUser
}

// Instantiate Prisma Client
const prisma = new PrismaClient()

// export default defineEventHandler(async (event) => {
//     return {
//         api: 'create post', 
//     }
// })

// Create a new post with a new user
export default defineEventHandler(async (event) => {

  // Get the request body
  const body = await readBody<IPost>(event)

  if (!body.author) {
    throw new Error('Author is required')
  } else if (!body.author.email) {
    throw new Error('Author email is required')
  } else if (!body.author.name) {
    throw new Error('Author name is required')
  } else if (!body.title) {
    throw new Error('Title is required')
  } else if (!body.content) {
    throw new Error('Content is required')
  } else if (body.published === undefined) {
    throw new Error('Published is required')
  } else if (typeof body.published !== 'boolean') {
    throw new Error('Published must be a boolean')
  } else {
    
    // console.log('All fields are valid')
    const posts = await prisma.post.create({
    data: {
        title: body.title,
        content: body.content,
        published: body.published,
        author: {
          connectOrCreate: {
            where: {
              email: body.author!.email
            },
            create: {
              name: body.author!.name,
              email: body.author!.email
            }
          }
        },
      }
    })

    // Return the new post
    return posts
  }

})