import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { PermissionsStore } from "./permissions.store"
import { CheckboxGroupComponent } from "./checkbox-group/checkbox-group.component"

export type PermissionsGroup = {
	name: string
	type: "Group" | "subGroup" | "List"
	completed: boolean
	childrens?: PermissionsGroup[]
}

export interface Task {
	name: string
	type: "task" | "subtask" | "list"
	completed: boolean
	subtasks?: Task[]
}

@Component({
	selector: "ant-checkbox-groups",
	standalone: true,
	imports: [MatCheckboxModule, FormsModule, CheckboxGroupComponent],
	templateUrl: "./checkbox-groups.component.html",
	styleUrl: "./checkbox-groups.component.scss",
	providers: [PermissionsStore],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupsComponent implements OnInit {
	checkedPermissions = ["1", "2", "5", "8", "9"]
	readonly store = inject(PermissionsStore)
	tasks: Task[] = []

	ngOnInit(): void {
		const tasks = this.store.getPermissionsTree().map((section) => {
			if (section.categories?.length && !section.permissions?.length) {
				return section.categories?.map((category) => {
					let subtasks: Task[] = [] as Task[]
					if (category.subcategories?.length) {
						subtasks = category.subcategories?.map(({ name, permissions }) => ({
							name,
							type: "subtask",
							completed: permissions?.every(({ id }) => this.checkedPermissions.includes(id)) ?? false,
							subtasks: permissions?.length
								? permissions?.map(({ id, name }) => ({
										name,
										type: "task",
										completed: this.checkedPermissions.includes(id)
									}))
								: []
						}))
					}
					const leafs = category.permissions?.length
						? category.permissions?.map(({ id, name }) => ({
								name,
								type: "task",
								completed: this.checkedPermissions.includes(id)
							}))
						: []

					return {
						name: category.name,
						type: "task",
						completed:
							category.permissions?.every(
								({ id }) => this.checkedPermissions.includes(id) && subtasks?.every(({ completed }) => completed)
							) ?? false,
						subtasks: [...subtasks, ...leafs]
					}
				})
			} else {
				return {
					name: "List",
					type: "list",
					completed: false,
					subtasks: section.permissions?.map(({ id, name }) => ({
						name,
						type: "task",
						completed: this.checkedPermissions.includes(id)
					}))
				}
			}
		})

		this.tasks = tasks.flat() as Task[]
	}
}
