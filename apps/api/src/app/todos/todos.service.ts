import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Todo } from "./todo.model"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { QueryOptionsQuery } from "../helpers/pagination.helper"
import { type WhereOptions, type Order, Op } from "sequelize"

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
		const { pageNumber, pageSize, filterField, filterValue, sortField, sortDirection } = query

		console.log("query", query)

		let whereOptions: WhereOptions
		let orderOptions: Order

		if (filterField && filterValue) {
			whereOptions = { [filterField]: { [Op.iLike]: `%${filterValue}%` } }
		}
		if (sortField && sortDirection) {
			orderOptions = [[sortField, sortDirection]]
		}

		const todos = await this.todoModel.findAll({
			where: whereOptions,
			order: orderOptions,
			offset: (pageNumber - 1) * pageSize,
			limit: pageSize
		})

		const totalCount = await this.todoModel.count({ where: whereOptions })

		return {
			data: todos,
			pagination: {
				pageNumber,
				pageSize: todos.length,
				pagesCount: Math.ceil(todos.length / pageSize),
				itemsCount: totalCount
			}
		}
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
