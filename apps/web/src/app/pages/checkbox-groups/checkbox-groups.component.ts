import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { PermissionsStore } from "./permissions.store"

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
	selector: "ant-checkbox-groups",
	standalone: true,
	imports: [MatCheckboxModule, FormsModule],
	templateUrl: "./checkbox-groups.component.html",
	styleUrl: "./checkbox-groups.component.scss",
	providers: [PermissionsStore],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupsComponent implements OnInit {
	checkedPermissions = ["1", "2", "5"]
	readonly store = inject(PermissionsStore)
	ngOnInit(): void {
		console.log("CheckboxGroupsComponent: tick:", Date.now())
		console.log("this.store.getPermissionsTree():", this.store.getPermissionsTree()[0])

		const treeNodeCategories = this.store.getPermissionsTree()[0].categories
		if (treeNodeCategories?.length) {
			const treeNodeCategory = treeNodeCategories[0]
			this.task.set({
				name: treeNodeCategory.name,
				completed: treeNodeCategory.permissions?.every((p) => this.checkedPermissions.includes(p.id)) ?? false,
				subtasks: treeNodeCategory.permissions?.map((p) => ({
					name: p.name,
					completed: this.checkedPermissions.includes(p.id)
				}))
			})
		}
	}

	readonly task = signal<Task>({
		name: "",
		completed: true,
		subtasks: []
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
