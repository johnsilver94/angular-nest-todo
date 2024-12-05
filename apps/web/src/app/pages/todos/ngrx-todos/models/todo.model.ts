import { BaseEntity } from "./crud.model"

export type Todo = BaseEntity & {
	title: string
	description: string
	completed: boolean
}

export type CreateTodo = Omit<Todo, "id" | "createdAt" | "updatedAt">
export type UpdateTodo = Omit<Todo, "createdAt" | "updatedAt">
