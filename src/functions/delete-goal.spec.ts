import { describe, expect, it } from 'vitest'
import { makeGoal } from '../../tests/factories/make-goal'
import { makeUser } from '../../tests/factories/make-user'
import { deleteGoal } from './delete-goal'

describe('delete goal', () => {
  it('should be able to delete a goal', async () => {
    const user = await makeUser()
    const goal = await makeGoal({ userId: user.id })

    const result = await deleteGoal({
      userId: user.id,
      goalId: goal.id,
    })

    expect(result).toEqual({
      goal: expect.objectContaining({
        id: goal.id,
        title: goal.title,
      }),
    })
  })

  it('should not be able to delete a goal that does not belong to user', async () => {
    const user = await makeUser()
    const anotherUser = await makeUser()
    const goal = await makeGoal({ userId: anotherUser.id })

    await expect(
      deleteGoal({
        userId: user.id,
        goalId: goal.id,
      })
    ).rejects.toThrow()
  })

  it('should not be able to delete a goal that does not exist', async () => {
    const user = await makeUser()

    await expect(
      deleteGoal({
        userId: user.id,
        goalId: 'non-existing-goal-id',
      })
    ).rejects.toThrow()
  })
})
