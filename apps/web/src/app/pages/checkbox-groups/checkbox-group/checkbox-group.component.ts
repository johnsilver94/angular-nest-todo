import {
	ChangeDetectionStrategy,
	Component,
	computed,
	EventEmitter,
	Input,
	Output,
	signal,
	SimpleChanges,
	WritableSignal,
	OnChanges
} from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { Task } from "../checkbox-groups.component"
import { CommonModule } from "@angular/common"

export type PermissionsGroup = {
	name: string
	completed: boolean
	childrens?: PermissionsGroup[]
}

@Component({
	selector: "ant-checkbox-group",
	standalone: true,
	imports: [CommonModule, MatCheckboxModule, FormsModule],
	templateUrl: "./checkbox-group.component.html",
	styleUrl: "./checkbox-group.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupComponent implements OnChanges {
	_task: WritableSignal<Task> = signal<Task>({} as Task)

	@Output() updateTask = new EventEmitter<{ completed: boolean; name: string }>()

	@Input()
	set task(data: Task) {
		console.log("🚀 ~ CheckboxGroupComponent ~ @Input ~ data:", data)
		this._task.set(data)
	}

	get task(): WritableSignal<Task> {
		return this._task
	}

	ngOnChanges(changes: SimpleChanges) {
		const taskChanges = changes["task"]
		const currentCompleted = (changes["task"].currentValue as Task).completed

		if (!taskChanges.firstChange) this.update(currentCompleted)
	}

	readonly partiallyComplete = computed(() => {
		const task = this.task()
		if (!task.subtasks) {
			return false
		}
		return task.subtasks.some((t) => t.completed) && !task.subtasks.every((t) => t.completed)
	})

	onUpdateTask({ completed, name }: { completed: boolean; name: string }) {
		this.update(
			completed,
			this.task().subtasks?.findIndex((t) => t.name === name)
		)
	}

	update(completed: boolean, index?: number) {
		this.task.update((task) => {
			if (index === undefined) {
				task.completed = completed
				task.subtasks = task.subtasks?.map((data) => ({ ...data, completed }))
			} else {
				task.subtasks![index].completed = completed
				task.completed = task.subtasks?.every((t) => t.completed) ?? true
			}

			this.updateTask.emit({ name: task.name, completed: task.completed })

			return { ...task }
		})
		console.log("🚀 ~ CheckboxGroupComponent ~ this._task.update ~ this._task:", this.task())
	}
}
