'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function savePracticeSession(
  userId: string,
  level: number,
  wpm: number,
  accuracy: number,
  timeTaken: number,
  score: number,
  practiceTextId: number
) {
  try {
    const practiceSession = await prisma.practiceSession.create({
      data: {
        userId,
        level,
        wpm,
        accuracy,
        timeTaken,
        score,
        practiceTextId,
      },
    })
    return { success: true, practiceSession }
  } catch (error) {
    console.error('Error saving practice session:', error)
    return { success: false, error: 'Failed to save practice session' }
  } finally {
    console.log('Disconnecting from database')
    await prisma.$disconnect()
  }
}
