import { PrismaClient } from "@prisma/client"

// Interface for Post
interface IPost {
  title: string
  content: string
  published: boolean
}

// Instantiate Prisma Client
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // Get params from event
  const id = event.context.params?.id

  // Get the request body
  const body = await readBody<IPost>(event)

  // Check if ID is provided
  if (!id) {
    throw new Error("ID is required")
  } else if (!body.title) {
    throw new Error("Title is required")
  } else if (!body.content) {
    throw new Error("Content is required")
  } else if (body.published === undefined) {
    throw new Error("Published is required")
  } else if (typeof body.published !== "boolean") {
    throw new Error("Published must be a boolean")
  } else {
    // console.log('All fields are valid')
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    })
    return post
  }
})
