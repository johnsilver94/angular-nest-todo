import { ComponentFixture, TestBed } from "@angular/core/testing"

import { signal } from "@angular/core"
import { TodosStore } from "../store/ngrx-todos.store"
import { CreateEditTodoComponent } from "./create-edit-todo.component"

describe("CreateEditTodoComponent", () => {
	let component: CreateEditTodoComponent
	let fixture: ComponentFixture<CreateEditTodoComponent>

	const todoStore = {
		isLoading: signal(false)
	}

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreateEditTodoComponent],
			providers: [{ provide: TodosStore, useValue: todoStore }]
		}).compileComponents()

		fixture = TestBed.createComponent(CreateEditTodoComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it("should create", () => {
		expect(component).toBeTruthy()
	})
})
