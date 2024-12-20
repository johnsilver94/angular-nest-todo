import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core"
import { TodosStore } from "../store/ngrx-todos.store"

@Component({
	selector: "ant-view-todo",
	imports: [CommonModule],
	standalone: true,
	templateUrl: "./view-todo.component.html",
	styleUrls: ["./view-todo.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTodoComponent {
	open = signal<boolean>(false)

	readonly store = inject(TodosStore)
	readonly selectedTodo = this.store.todoEntitySelected

	closeModal() {
		this.open.set(false)
	}
}
