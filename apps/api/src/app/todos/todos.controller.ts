import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"
import { TodosService } from "./todos.service"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { Todo } from "./todo.model"

@Controller("todos")
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Post()
	create(@Body() createUserDto: CreateTodoDto): Promise<Todo> {
		return this.todosService.create(createUserDto)
	}

	@Get()
	findAll(): Promise<Todo[]> {
		return this.todosService.findAll()
	}

	@Get(":id")
	findOne(@Param("id") id: string): Promise<Todo> {
		return this.todosService.findOne(id)
	}

	@Delete(":id")
	remove(@Param("id") id: string): Promise<void> {
		return this.todosService.remove(id)
	}
}
