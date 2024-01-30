import { PrismaClient } from "@prisma/client"

// Instantiate Prisma Client
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    // Get params from event
    const id = event.context.params?.id

    if (!id) {
        throw new Error('ID is required')
    } else {
        const post = await prisma.post.delete({
            where: {
                id: Number(id)
            }
        })
        return post
    }
    
})