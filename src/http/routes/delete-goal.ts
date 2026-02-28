import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { deleteGoal } from '../../functions/delete-goal'
import { authenticateUserHook } from '../hooks/authenticate-user'

export const deleteGoalRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/goals/:goalId',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        description: 'Delete a goal',
        operationId: 'deleteGoal',
        params: z.object({
          goalId: z.string(),
        }),
        response: {
          200: z.null(),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub
      const { goalId } = request.params

      await deleteGoal({ userId, goalId })

      return reply.status(200).send(null)
    }
  )
}
