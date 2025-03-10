import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, effect, inject, signal } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"

import { Todo } from "../../../../models/todo.model"
import { TodosStore } from "../store/ngrx-todos.store"

type Mode = "create" | "edit"
export type TodoForm = {
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

	open = signal<boolean>(false)
	mode = signal<Mode>("edit")

	readonly selectedTodo = this.store.todoEntitySelected
	readonly isLoading = this.store.isLoading
	readonly addTodo = this.store.addOne
	readonly updateTodo = this.store.updateOne

	todoForm: FormGroup<TodoForm> = new FormGroup({
		title: new FormControl<string>("New Todo", { nonNullable: true, validators: [Validators.required] }),
		team: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
		status: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
		priority: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
		description: new FormControl<string>("", { nonNullable: true, validators: [Validators.required] }),
		completed: new FormControl<boolean>(false, { nonNullable: true })
	})

	constructor() {
		effect(
			() => {
				const todo = this.selectedTodo()
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
			},
			{ allowSignalWrites: true }
		)
	}

	closeModal() {
		this.open.set(false)
	}

	discardChanges() {
		const todo = this.selectedTodo()
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
		const todo = this.selectedTodo()

		if (!this.todoForm.valid) {
			return
		}

		if (this.mode() === "edit" && !todo) {
			return
		}

		const todoData = this.todoForm.value as Omit<Todo, "id">

		if (this.mode() === "create") {
			this.addTodo(todoData)
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this.updateTodo({ id: todo!.id, ...todoData })
		}

		this.closeModal()
	}
}
