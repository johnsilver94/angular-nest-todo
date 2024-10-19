import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { PermissionsStore } from "./permissions.store"
import { CheckboxGroupComponent } from "./checkbox-group/checkbox-group.component"

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
	imports: [MatCheckboxModule, FormsModule, CheckboxGroupComponent],
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

		const tasks = this.store.getPermissionsTree().map((section) => {
			console.log("🚀 ~ CheckboxGroupsComponent ~ tasks ~ section:", section)
			return section.categories?.map((category) => ({
				name: category.name,
				completed: category.permissions?.every(({ id }) => this.checkedPermissions.includes(id)) ?? false,
				subtasks: category.permissions?.map(({ name }) => ({ name }))
			}))
		})
		console.log("🚀 ~ CheckboxGroupsComponent ~ tasks ~ tasks:", tasks)
	}
}
