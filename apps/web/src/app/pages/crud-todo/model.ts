export type BaseEntity = { id: string }

export interface Todo extends BaseEntity {
	title: string
	description: string
	completed: boolean
}
