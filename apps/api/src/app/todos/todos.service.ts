import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Todo } from "./todo.model"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { QueryOptionsQuery } from "../helpers/pagination.helper"

@Injectable()
export class TodosService {
	constructor(
		@InjectModel(Todo)
		private todoModel: typeof Todo
	) {}

	create(createTodoDto: CreateTodoDto): Promise<Todo> {
		return this.todoModel.create({
			title: createTodoDto.title,
			description: createTodoDto.description,
			completed: createTodoDto.completed
		})
	}

	async findAll(): Promise<Todo[]> {
		return this.todoModel.findAll()
	}

	async findAllPaginated(query: QueryOptionsQuery) {
		const { pageNumber, pageSize } = query

		console.log("query", query)

		return this.todoModel.findAll({ offset: (pageNumber - 1) * pageSize, limit: pageSize })
	}

	findOne(id: string): Promise<Todo> {
		return this.todoModel.findOne({
			where: {
				id
			}
		})
	}

	async remove(id: string): Promise<void> {
		const user = await this.findOne(id)
		await user.destroy()
	}
}
