import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { deleteGoalCompletion } from '../../functions/delete-goal-completion'
import { authenticateUserHook } from '../hooks/authenticate-user'

export const deleteCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/completions/:goalCompletionId',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        description: 'Delete a goal completion',
        operationId: 'deleteCompletion',
        params: z.object({
          goalCompletionId: z.string(),
        }),
        response: {
          200: z.null(),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub
      const { goalCompletionId } = request.params

      await deleteGoalCompletion({ userId, goalCompletionId })

      return reply.status(200).send(null)
    }
  )
}
