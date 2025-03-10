import { ComponentFixture, TestBed } from "@angular/core/testing"

import { provideHttpClient } from "@angular/common/http"
import { signal } from "@angular/core"
import { Todo } from "../../../../models/todo.model"
import { RequestStatus } from "../store/features/request-status.feature"
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

	addOne = jest.fn()
	updateOne = jest.fn()
	todoEntitySelected = jest.fn().mockImplementation(() => this.todos[0])

	requestStatus = signal<RequestStatus>("idle")
	// todoEntitySelected = signal<Todo | null>(this.todos[0])
}

describe("CreateEditTodoComponent", () => {
	let component: CreateEditTodoComponent
	let fixture: ComponentFixture<CreateEditTodoComponent>
	let mockStore: MockTodosStore

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreateEditTodoComponent],
			providers: [{ provide: TodosStore, useClass: MockTodosStore }, provideHttpClient()]
		}).compileComponents()

		fixture = TestBed.createComponent(CreateEditTodoComponent)
		component = fixture.componentInstance
		mockStore = TestBed.inject(TodosStore) as unknown as MockTodosStore

		fixture.detectChanges()
	})

	it("should create", () => {
		expect(component).toBeTruthy()
	})

	it("should close modal", () => {
		component.closeModal()
		expect(component.open()).toBeFalsy()
	})

	it("should discard changes in edit mode", () => {
		component.discardChanges()

		expect(mockStore.todoEntitySelected).toHaveBeenCalled()

		expect(component.todoForm.value.title).toBe(mockStore.todos[0].title)
	})

	it("should discard changes in create mode", () => {
		mockStore.todoEntitySelected.mockImplementation(() => null)
		component.discardChanges()

		expect(mockStore.todoEntitySelected).toHaveBeenCalled()

		expect(component.todoForm.value.title).toBe("New Todo")
	})

	describe("create or edit submit", () => {
		it("should not submit if form is invalid", () => {
			component.todoForm.get("title")?.setValue(null as unknown as string)
			component.todoForm.updateValueAndValidity()

			fixture.detectChanges()

			component.createOrEditSubmit()

			expect(component.todoForm.valid).toBeFalsy()
			expect(mockStore.addOne).not.toHaveBeenCalled()
			expect(mockStore.updateOne).not.toHaveBeenCalled()
		})

		it('should not submit if there are no todo selected in "edit" mode', () => {
			mockStore.todoEntitySelected.mockImplementation(() => null)

			const updateTodo = {
				title: "Updated Todo",
				team: "team 1",
				status: "active",
				priority: "high",
				description: "Updated description",
				completed: true
			}

			component.mode.set("edit")

			fixture.detectChanges()

			component.todoForm.setValue(updateTodo)
			component.todoForm.updateValueAndValidity()

			fixture.detectChanges()

			expect(component.todoForm.valid).toBeTruthy()
			expect(component.mode()).toBe("edit")

			component.createOrEditSubmit()

			expect(mockStore.addOne).not.toHaveBeenCalled()
			expect(mockStore.updateOne).not.toHaveBeenCalled()
		})

		it("should create todo in create mode", () => {
			const newTodo = {
				title: "New Todo",
				team: "team 1",
				status: "active",
				priority: "high",
				description: "New description",
				completed: false
			}

			component.mode.set("create")

			fixture.detectChanges()

			component.todoForm.setValue(newTodo)
			component.todoForm.updateValueAndValidity()

			fixture.detectChanges()

			expect(component.todoForm.valid).toBeTruthy()
			expect(component.mode()).toBe("create")
			expect(component.todoForm.value).toEqual(newTodo)

			component.createOrEditSubmit()

			fixture.detectChanges()

			expect(mockStore.addOne).toHaveBeenCalledWith(newTodo)
			expect(mockStore.updateOne).not.toHaveBeenCalled()
		})

		it("should update todo in edit mode", () => {
			const updateTodo = {
				title: "Updated Todo",
				team: "team 1",
				status: "active",
				priority: "high",
				description: "Updated description",
				completed: true
			}

			component.mode.set("edit")

			fixture.detectChanges()

			component.todoForm.setValue(updateTodo)
			component.todoForm.updateValueAndValidity()

			fixture.detectChanges()

			expect(component.todoForm.valid).toBeTruthy()
			expect(component.mode()).toBe("edit")
			expect(component.todoForm.value).toEqual(updateTodo)

			component.createOrEditSubmit()

			fixture.detectChanges()

			expect(mockStore.addOne).not.toHaveBeenCalled()
			expect(mockStore.updateOne).toHaveBeenCalledWith({
				id: mockStore.todos[0].id,
				...updateTodo
			})
		})
	})
})
