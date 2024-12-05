import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Todo } from "../../../../models/todo.model"
import { TodosStore } from "../store/ngrx-todos.store"

type Mode = "create" | "edit"
type TodoForm = {
	title: FormControl<string>
	team: FormControl<string>
	status: FormControl<string>
	priority: FormControl<string>
	description: FormControl<string>
	completed: FormControl<boolean>
}

@Component({
	selector: "ant-create-edit-todo",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./create-edit-todo.component.html",
	styleUrl: "./create-edit-todo.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditTodoComponent {
	readonly store = inject(TodosStore)

	todo = input<Todo>()
	open = signal<boolean>(false)
	mode = signal<Mode>("edit")

	readonly isLoading = this.store.isLoading
	readonly addTodo = this.store.addTodo
	readonly updateTodo = this.store.updateTodo

	todoForm: FormGroup<TodoForm> = new FormGroup({
		title: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
		team: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
		status: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
		priority: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
		description: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
		completed: new FormControl<boolean>(false, { nonNullable: true })
	})

	constructor() {
		effect(() => {
			console.log("constructor - effect - todo", this.todo())
			const todo = this.todo()
			if (todo) {
				this.todoForm.setValue({
					title: todo.title,
					team: "",
					status: "",
					priority: "",
					description: todo.description,
					completed: todo.completed
				})
			}
		})
	}

	closeModal() {
		this.open.set(false)
	}

	discardChanges() {
		const todo = this.todo()
		if (todo) {
			this.todoForm.reset(
				{
					title: todo.title,
					team: "",
					status: "",
					priority: "",
					description: todo.description,
					completed: todo.completed
				},
				{ onlySelf: true, emitEvent: true }
			)

			return
		}

		this.todoForm.reset()
	}

	createOrEditSubmit() {
		const todo = this.todo()

		if (!this.todoForm.valid || todo === undefined) {
			return
		}

		console.log("createOrEditSubmit:", this.todoForm.value)

		const todoData = this.todoForm.value as Omit<Todo, "id">

		if (this.mode() === "create") {
			this.addTodo(todoData)
		} else {
			this.updateTodo({ id: todo.id, ...todoData })
		}

		this.closeModal()
	}
}
