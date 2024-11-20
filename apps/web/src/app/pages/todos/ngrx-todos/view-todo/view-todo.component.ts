import { Component, input, signal } from "@angular/core"
import type { Todo } from "../../../../models/todo.model"
import { CommonModule } from "@angular/common"

@Component({
	selector: "ant-view-todo",
	imports: [CommonModule],
	standalone: true,
	templateUrl: "./view-todo.component.html",
	styleUrls: ["./view-todo.component.scss"]
})
export class ViewTodoComponent {
	todo = input<Todo>()
	open = signal<boolean>(false)

	closeModal() {
		this.open.set(false)
	}
}
