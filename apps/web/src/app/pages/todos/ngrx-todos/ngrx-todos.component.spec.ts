import { provideHttpClient } from "@angular/common/http"
import { signal } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { Todo } from "../../../models/todo.model"
import { NgrxTodosComponent } from "./ngrx-todos.component"
import { RequestStatus } from "./store/features/request-status.feature"
import { TodosStore } from "./store/ngrx-todos.store"

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
	todoEntitySelect = jest.fn()
	deleteOne = jest.fn()
	query = jest.fn()
	updateQuery = jest.fn()
	getAllPaginated = jest.fn().mockImplementation(() => this.todos)

	requestStatus = signal<RequestStatus>("idle")
	todoEntities = signal<Todo[]>(this.todos)
}

describe("NgrxTodosComponent", () => {
	let component: NgrxTodosComponent
	let fixture: ComponentFixture<NgrxTodosComponent>
	let mockStore: MockTodosStore

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NgrxTodosComponent, NoopAnimationsModule],
			providers: [{ provide: TodosStore, useClass: MockTodosStore }, provideHttpClient()]
		}).compileComponents()

		fixture = TestBed.createComponent(NgrxTodosComponent)
		component = fixture.componentInstance
		mockStore = TestBed.inject(TodosStore) as unknown as MockTodosStore

		fixture.detectChanges()
	})

	it("should create", () => {
		expect(component).toBeTruthy()
	})

	it("should display todos", () => {
		expect(mockStore.todoEntities().length).toBeGreaterThan(0)
	})

	it("should update query sorting on sort change", () => {
		const spyUpdateQuery = jest.spyOn(component, "updateQuery")

		component.sort.sortChange.emit({
			active: "title",
			direction: "asc"
		})

		fixture.detectChanges()

		expect(spyUpdateQuery).toHaveBeenCalledWith({ sortField: "title", sortDirection: "ASC" })

		component.sort.sortChange.emit({
			active: "title",
			direction: "desc"
		})

		fixture.detectChanges()

		expect(spyUpdateQuery).toHaveBeenCalledWith({ sortField: "title", sortDirection: "DESC" })
	})

	it("should update query pagination on paginator page change", () => {
		const spyUpdateQuery = jest.spyOn(component, "updateQuery")

		component.paginator.page.emit({
			pageIndex: 0,
			pageSize: 10,
			length: 20
		})

		fixture.detectChanges()

		expect(spyUpdateQuery).toHaveBeenCalledWith({ pageNumber: 1, pageSize: 10 })
	})

	it("should update query filters on queryForm value changes", () => {
		const spyUpdateQuery = jest.spyOn(component, "updateQuery")

		component.queryForm.setValue({ title: "Mock Todo" })
		component.queryForm.updateValueAndValidity()

		fixture.detectChanges()

		expect(spyUpdateQuery).toHaveBeenCalledWith({ filterValue: "Mock Todo" })
	})

	it('should clear query filter on "Clear Filter"', () => {
		component.queryForm.setValue({ title: "Mock Todo" })

		component.clearFilters()

		fixture.detectChanges()

		expect(component.queryForm.value.title).toBe("")
	})

	it("should remove todo", () => {
		const spyDeleteTodo = jest.spyOn(component, "deleteTodo")

		const todo: Todo = mockStore.todos[0]

		component.removeTodo(todo)

		fixture.detectChanges()

		expect(component.paginator.pageIndex).toBe(0)
		expect(spyDeleteTodo).toHaveBeenCalledWith({ id: todo.id })
	})

	it("should select and open modal on viewTodo", () => {
		const spyEntitySelect = jest.spyOn(component, "todoEntitySelect")

		expect(component.viewModal.open()).toBeFalsy()

		const todo: Todo = mockStore.todos[0]

		component.viewTodo(todo)
		expect(spyEntitySelect).toHaveBeenCalledWith(todo.id)

		fixture.detectChanges()

		expect(component.viewModal.open()).toBeTruthy()
	})

	it("should select and open modal on editTodo", () => {
		const spyEntitySelect = jest.spyOn(component, "todoEntitySelect")

		expect(component.createEditModal.open()).toBeFalsy()

		const todo: Todo = mockStore.todos[0]

		component.editTodo(todo)

		fixture.detectChanges()

		expect(spyEntitySelect).toHaveBeenCalledWith(todo.id)
		expect(component.createEditModal.mode()).toBe("edit")
		expect(component.createEditModal.open()).toBeTruthy()
	})

	it("should set mode to create and open modal on addTodo", () => {
		expect(component.createEditModal.open()).toBeFalsy()

		component.addTodo()

		fixture.detectChanges()

		expect(component.createEditModal.mode()).toBe("create")
		expect(component.createEditModal.open()).toBeTruthy()
	})
})
