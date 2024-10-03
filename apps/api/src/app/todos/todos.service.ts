import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Todo } from "./todo.model"
import { CreateTodoDto } from "./dto/create-todo.dto"
import Paginator from "../paginator/paginator"
import { PaginationQuery } from "../paginator/paginator.types"

@Injectable()
export class TodosService {
	constructor(
		@InjectModel(Todo)
		private todoModel: typeof Todo
	) {}

	async create(createTodoDto: CreateTodoDto): Promise<Todo> {
		return this.todoModel.create({
			title: createTodoDto.title,
			description: createTodoDto.description,
			completed: createTodoDto.completed
		})
	}

	async findAll(): Promise<Todo[]> {
		return this.todoModel.findAll()
	}

	async findAllPaginated(query: PaginationQuery) {
		const paginator = new Paginator(Todo)
		return paginator.paginate(query)
	}

	async findOne(id: string): Promise<Todo> {
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
