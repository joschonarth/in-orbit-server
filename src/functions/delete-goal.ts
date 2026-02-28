import { and, eq } from 'drizzle-orm'
import { db } from '../db'
import { goals } from '../db/schema'

interface DeleteGoalRequest {
  userId: string
  goalId: string
}

export async function deleteGoal({ userId, goalId }: DeleteGoalRequest) {
  const result = await db
    .delete(goals)
    .where(and(eq(goals.id, goalId), eq(goals.userId, userId)))
    .returning()

  if (result.length === 0) {
    throw new Error('Goal not found or does not belong to user!')
  }

  const goal = result[0]

  return {
    goal,
  }
}
