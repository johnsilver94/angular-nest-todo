import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { RouterOutlet } from "@angular/router"
import { TodoStore } from "./todo.store"
import { Todo } from "./model"

@Component({
	selector: "ant-crud-todo",
	standalone: true,
	imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
	templateUrl: "./crud-todo.component.html",
	styleUrl: "./crud-todo.component.scss",
	providers: [TodoStore],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CRUDTodoComponent {
	readonly store = inject(TodoStore)

	createTodoForm: FormGroup

	constructor() {
		this.createTodoForm = new FormGroup({
			title: new FormControl<string>("", Validators.required),
			description: new FormControl<string>("", Validators.required),
			completed: new FormControl<boolean>(false)
		})
	}

	addTodo() {
		this.store.addItem({
			title: this.createTodoForm.value.title,
			completed: this.createTodoForm.value.completed,
			description: "default"
		})
	}

	updateCompleted(todo: Todo, event: Event) {
		const eventTarget = event.target as HTMLInputElement
		if (!eventTarget || !eventTarget.checked) return
		this.store.updateItem({
			id: todo.id,
			title: todo.title,
			completed: eventTarget.checked,
			description: todo.description
		})
	}

	deleteTodo(todo: Todo) {
		this.store.deleteItem(todo)
	}
}
