import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { NGRXEntitiesTodoStore, Todo } from "./ngrx-entities.store"

@Component({
	selector: "ant-ngrx-entities",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./ngrx-entities.component.html",
	styleUrl: "./ngrx-entities.component.scss",
	providers: [NGRXEntitiesTodoStore],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxEntitiesTodoComponent {
	readonly store = inject(NGRXEntitiesTodoStore)

	createTodoForm: FormGroup

	constructor() {
		this.createTodoForm = new FormGroup({
			text: new FormControl<string>("", Validators.required),
			completed: new FormControl<boolean>(false)
		})
	}

	addTodo() {
		this.store.addTodo({
			key: new Date().getTime(),
			text: this.createTodoForm.value.text,
			completed: this.createTodoForm.value.completed
		})
	}

	updateCompleted(todo: Todo, event: Event) {
		const eventTarget = event.target as HTMLInputElement
		if (!eventTarget) return
		this.store.updateTodo({
			key: todo.key,
			text: todo.text,
			completed: eventTarget.checked
		})
	}

	deleteTodo(todo: Todo) {
		this.store.removeTodo(todo.key)
	}
}
