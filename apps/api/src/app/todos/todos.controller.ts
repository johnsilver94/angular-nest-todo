import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"
import { TodosService } from "./todos.service"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { Todo } from "./todo.model"
import { PaginationQueryDto } from "../paginator/dto/paginator-query.dto"

@Controller("todos")
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Post()
	create(@Body() createUserDto: CreateTodoDto): Promise<Todo> {
		return this.todosService.create(createUserDto)
	}

	@Post("paginated")
	getTodosPaginated(@Body() query: PaginationQueryDto) {
		return this.todosService.findAllPaginated(query)
	}

	@Get()
	getTodos(): Promise<Todo[]> {
		return this.todosService.findAll()
	}

	@Get(":id")
	getOne(@Param("id") id: string): Promise<Todo> {
		return this.todosService.findOne(id)
	}

	@Delete(":id")
	removeOne(@Param("id") id: string): Promise<void> {
		return this.todosService.remove(id)
	}
}
