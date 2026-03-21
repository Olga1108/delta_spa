import type { z } from 'zod'
import type { tasksResponseSchema, taskTileSchema } from './schema'

export type TaskTile = z.infer<typeof taskTileSchema>
export type TaskData = z.infer<typeof tasksResponseSchema>
