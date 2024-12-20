import { ComponentFixture, TestBed } from "@angular/core/testing"
import { TodosStore } from "../store/ngrx-todos.store"
import { ViewTodoComponent } from "./view-todo.component"

describe("ViewTodoComponent", () => {
	let component: ViewTodoComponent
	let fixture: ComponentFixture<ViewTodoComponent>

	const todosStoreMock = {
		todoEntitySelected: jest.fn()
	}

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ViewTodoComponent],
			providers: [
				{
					provide: TodosStore,
					useValue: todosStoreMock
				}
			]
		}).compileComponents()

		fixture = TestBed.createComponent(ViewTodoComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it("should create", () => {
		expect(component).toBeTruthy()
	})

	it("should close modal", () => {
		component.open.set(true)
		component.closeModal()
		expect(component.open()).toBeFalsy()
	})
})
