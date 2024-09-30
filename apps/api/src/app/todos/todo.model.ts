import { Column, Model, Table } from "sequelize-typescript"

@Table({ createdAt: true, updatedAt: true })
export class Todo extends Model {
	@Column
	title: string

	@Column
	description: string

	@Column({ defaultValue: false })
	completed: boolean
}
