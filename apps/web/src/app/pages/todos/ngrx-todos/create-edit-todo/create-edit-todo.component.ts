import { Component, input, signal } from "@angular/core"
import type { Todo } from "../../../../models/todo.model"
import { CommonModule } from "@angular/common"

type Mode = "create" | "edit"

@Component({
	selector: "ant-create-edit-todo",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./create-edit-todo.component.html",
	styleUrl: "./create-edit-todo.component.scss"
})
export class CreateEditTodoComponent {
	todo = input<Todo>()
	open = signal<boolean>(false)
	mode = signal<Mode>("edit")

	closeModal() {
		this.open.set(false)
	}
}
