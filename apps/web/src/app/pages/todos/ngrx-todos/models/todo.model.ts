export type BaseEntity = { id: number; createdAt: string; updatedAt: string }

export type Todo = BaseEntity & {
	title: string
	description: string
	completed: boolean
}

export type CreateTodo = Omit<Todo, "id" | "createdAt" | "updatedAt">
export type UpdateTodo = Omit<Todo, "createdAt" | "updatedAt">
