import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { TodoStore } from "./todo.store"
import { Todo } from "./model"

@Component({
	selector: "ant-ngrx-crud",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./ngrx-crud.component.html",
	styleUrl: "./ngrx-crud.component.scss",
	providers: [TodoStore],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxCrudComponent {
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
		if (!eventTarget) return
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
