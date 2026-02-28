import { and, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals, users } from '../db/schema'

interface DeleteGoalCompletionRequest {
  userId: string
  goalCompletionId: string
}

export async function deleteGoalCompletion({
  userId,
  goalCompletionId,
}: DeleteGoalCompletionRequest) {
  const goalCompletion = await db.transaction(async tx => {
    const [existing] = await tx
      .select({
        completionId: goalCompletions.id,
        goalId: goalCompletions.goalId,
        userId: goals.userId,
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(eq(goalCompletions.id, goalCompletionId), eq(goals.userId, userId))
      )
      .limit(1)

    if (!existing) {
      throw new Error('Goal completion not found or does not belong to user!')
    }

    const [deleted] = await tx
      .delete(goalCompletions)
      .where(eq(goalCompletions.id, goalCompletionId))
      .returning()

    await tx
      .update(users)
      .set({
        experience: sql`${users.experience} - 5`,
      })
      .where(eq(users.id, userId))

    return deleted
  })

  return {
    goalCompletion,
  }
}
