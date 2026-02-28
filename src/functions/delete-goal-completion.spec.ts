import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { makeGoal } from '../../tests/factories/make-goal'
import { makeGoalCompletion } from '../../tests/factories/make-goal-completion'
import { makeUser } from '../../tests/factories/make-user'
import { db } from '../db'
import { users } from '../db/schema'
import { deleteGoalCompletion } from './delete-goal-completion'

describe('delete goal completion', () => {
  it('should be able to delete a goal completion', async () => {
    const user = await makeUser()
    const goal = await makeGoal({ userId: user.id })
    const goalCompletion = await makeGoalCompletion({ goalId: goal.id })

    const result = await deleteGoalCompletion({
      userId: user.id,
      goalCompletionId: goalCompletion.id,
    })

    expect(result).toEqual({
      goalCompletion: expect.objectContaining({
        id: goalCompletion.id,
        goalId: goal.id,
      }),
    })
  })

  it('should not be able to delete a completion that does not belong to user', async () => {
    const user = await makeUser()
    const anotherUser = await makeUser()
    const goal = await makeGoal({ userId: anotherUser.id })
    const goalCompletion = await makeGoalCompletion({ goalId: goal.id })

    await expect(
      deleteGoalCompletion({
        userId: user.id,
        goalCompletionId: goalCompletion.id,
      })
    ).rejects.toThrow()
  })

  it('should not be able to delete a completion that does not exist', async () => {
    const user = await makeUser()

    await expect(
      deleteGoalCompletion({
        userId: user.id,
        goalCompletionId: 'non-existing-completion-id',
      })
    ).rejects.toThrow()
  })

  it('should decrease user experience by 5 when deleting a goal completion', async () => {
    const user = await makeUser({ experience: 10 })
    const goal = await makeGoal({ userId: user.id, desiredWeeklyFrequency: 5 })
    const goalCompletion = await makeGoalCompletion({ goalId: goal.id })

    await deleteGoalCompletion({
      userId: user.id,
      goalCompletionId: goalCompletion.id,
    })

    const [userOnDb] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))

    expect(userOnDb.experience).toEqual(5)
  })
})
