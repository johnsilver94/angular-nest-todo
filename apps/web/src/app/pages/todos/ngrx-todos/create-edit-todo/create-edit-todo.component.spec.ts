import { ComponentFixture, TestBed } from "@angular/core/testing"

import { provideHttpClient } from "@angular/common/http"
import { signal } from "@angular/core"
import { Todo } from "../../../../models/todo.model"
import { TodosStore } from "../store/ngrx-todos.store"
import { CreateEditTodoComponent } from "./create-edit-todo.component"

export class MockTodosStore {
	todos: Todo[] = [
		{
			id: 1,
			title: "Mock Todo",
			completed: false,
			description: "",
			createdAt: "",
			updatedAt: ""
		},
		{
			id: 2,
			title: "Mock Todo 2",
			completed: false,
			description: "",
			createdAt: "",
			updatedAt: ""
		}
	]

	isLoading = signal(false)

	addTodo = jest.fn()
	removeTodo = jest.fn()
	toggleTodo = jest.fn()
	todoEntitySelected = signal<Todo | null>(this.todos[0])

	todoEntities = signal<Todo[]>(this.todos)
}

describe("CreateEditTodoComponent", () => {
	let component: CreateEditTodoComponent
	let fixture: ComponentFixture<CreateEditTodoComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreateEditTodoComponent],
			providers: [{ provide: TodosStore, useClass: MockTodosStore }, provideHttpClient()]
		}).compileComponents()

		fixture = TestBed.createComponent(CreateEditTodoComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it("should create", () => {
		expect(component).toBeTruthy()
	})
})
