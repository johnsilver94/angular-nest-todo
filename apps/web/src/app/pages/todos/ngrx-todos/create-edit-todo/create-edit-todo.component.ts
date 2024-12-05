import { CommonModule } from "@angular/common"
import { Component, effect, input, OnInit, signal } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import type { Todo } from "../../../../models/todo.model"

type Mode = "create" | "edit"
type TodoForm = {
	title: FormControl<string | null>
	team: FormControl<string | null>
	status: FormControl<string | null>
	priority: FormControl<string | null>
	description: FormControl<string | null>
	completed: FormControl<boolean | null>
}

@Component({
	selector: "ant-create-edit-todo",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./create-edit-todo.component.html",
	styleUrl: "./create-edit-todo.component.scss"
})
export class CreateEditTodoComponent implements OnInit {
	todo = input<Todo>()
	open = signal<boolean>(true)
	mode = signal<Mode>("edit")

	todoForm: FormGroup<TodoForm>

	constructor() {
		this.todoForm = new FormGroup({} as TodoForm)

		effect(() => {
			console.log("constructor - effect - todo", this.todo())
		})
	}

	ngOnInit(): void {
		const todo = this.todo()
		if (todo) {
			this.todoForm = new FormGroup<TodoForm>({
				title: new FormControl<string>(todo.title, Validators.required),
				team: new FormControl<string>("", Validators.required),
				status: new FormControl<string>("", Validators.required),
				priority: new FormControl<string>("", Validators.required),
				description: new FormControl<string>(todo.description, Validators.required),
				completed: new FormControl<boolean>(todo.completed)
			})
		}
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

	formSubmit() {
		if (!this.todoForm.valid) {
			return
		}

		console.log(this.todoForm.value)

		this.closeModal()
	}
}
