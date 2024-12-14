import { ChangeDetectionStrategy, Component, computed, inject, model, OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { CheckboxGroupComponent } from "./checkbox-group/checkbox-group.component"
import { PermissionsStore } from "./permissions.store"
import { arrayToTreeTest, getSections } from "./testArray"

export type TreeNode<TData extends object> = {
	type: "virtual" | "parent" | "intermediate" | "leaf"
	data: TData
	children: TreeNode<TData>[]
}

export type NodeData = {
	key: string
	name: string
	description: string
	permissionId?: string // permission id if is leaf
	permissionIds?: string[] // permission ids if is virtual, parent or intermediate node
	checked: boolean
	intermediate: boolean
}

// One section can have multiple trees
export type Section = {
	key: string
	name: string
	description: string
	tree: TreeNode<NodeData>[] // tree of permissions
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
	readonly store = inject(PermissionsStore)

	readonly isLoading = this.store.isLoading
	readonly basePermissions = this.store.permissions
	readonly updatePermissions = this.store.updatePermissions

	permissions = model<string[]>(["1", "2"])

	constructor() {
		arrayToTreeTest()
		getSections()
	}

	ngOnInit(): void {
		// set initial permissions
		console.log("🚀 ~ CheckboxGroupsComponent ~ ngOnInit ~ this.store.permissions()", this.store.permissions())
		// this.permissions.set(this.store.permissions())
	}

	sections = computed(() => {
		return []
	})

	saveChanges() {
		console.log("🚀 ~ CheckboxGroupsComponent ~ saveChanges ~ saveChanges:")

		this.updatePermissions(this.permissions())
	}

	discardChanges() {
		console.log("🚀 ~ CheckboxGroupsComponent ~ discardChanges ~ discardChanges:")
		this.updatePermissions([...this.basePermissions()])
	}
}
