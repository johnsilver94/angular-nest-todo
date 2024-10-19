import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { PermissionsStore } from "../permissions.store"

export type PermissionsGroup = {
	name: string
	completed: boolean
	childrens?: PermissionsGroup[]
}

export interface Task {
	name: string
	completed: boolean
	subtasks?: Task[]
}

@Component({
	selector: "ant-checkbox-group",
	standalone: true,
	imports: [MatCheckboxModule, FormsModule],
	templateUrl: "./checkbox-group.component.html",
	styleUrl: "./checkbox-group.component.scss",
	providers: [PermissionsStore],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupComponent {
	readonly store = inject(PermissionsStore)

	readonly task = signal<Task>({
		name: "Parent task",
		completed: false,
		subtasks: [
			{ name: "Child task 1", completed: true },
			{ name: "Child task 2", completed: false },
			{ name: "Child task 3", completed: false }
		]
	})

	readonly partiallyComplete = computed(() => {
		const task = this.task()
		if (!task.subtasks) {
			return false
		}
		return task.subtasks.some((t) => t.completed) && !task.subtasks.every((t) => t.completed)
	})

	update(completed: boolean, index?: number) {
		this.task.update((task) => {
			if (index === undefined) {
				task.completed = completed
				task.subtasks?.forEach((t) => (t.completed = completed))
			} else {
				task.subtasks![index].completed = completed
				task.completed = task.subtasks?.every((t) => t.completed) ?? true
			}
			return { ...task }
		})
	}
}
