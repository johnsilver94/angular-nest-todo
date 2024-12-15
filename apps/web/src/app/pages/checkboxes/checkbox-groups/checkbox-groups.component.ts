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
	section_key?: string // section key if is parent or intermediate
	parent_key?: string // parent key if is intermediate
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
	changeDetection: ChangeDetectionStrategy.Default
})
export class CheckboxGroupsComponent implements OnInit {
	readonly store = inject(PermissionsStore)

	readonly isLoading = this.store.isLoading
	readonly resetPermissions = this.store.resetPermissions
	readonly updatePermissions = this.store.updatePermissions
	readonly sections = this.store.sectionEntities
	readonly categories = this.store.categoryEntities
	readonly permissions = this.store.permissionEntities

	checkedPermissions = model<string[]>([])

	constructor() {
		arrayToTreeTest()
		getSections()
	}

	ngOnInit(): void {
		// set initial permissions
		this.checkedPermissions.set([...this.store.permissions()])
	}

	treeSections = computed<Section[]>(() => {
		console.group("sections Example")
		console.time("sections time")

		// create categories map
		const categoriesMap = new Map<string, TreeNode<NodeData>>()

		this.categories().forEach((category) => {
			categoriesMap.set(category.key, {
				type: category.parent_key ? "intermediate" : "parent",
				data: {
					key: category.key,
					name: category.name,
					description: category.description,
					section_key: category.section_key,
					parent_key: category.parent_key ?? undefined,
					permissionIds: [],
					checked: false,
					intermediate: false
				},
				children: []
			})
		})

		// add virtual node for orphan permissions
		categoriesMap.set("virtual-node", {
			type: "virtual",
			data: {
				key: "virtual-node",
				name: "Virtual node",
				description: "Virtual category for orphan permissions.",
				checked: false,
				intermediate: false
			},
			children: []
		})

		this.permissions().forEach((permission) => {
			// console.log("🚀 ~ CheckboxGroupsComponent ~ this.permissions ~ permission:", permission)
			const category = categoriesMap.get(permission.category_key ?? "virtual-node")
			// console.log("🚀 ~ CheckboxGroupsComponent ~ this.permissions ~ category:", category)
			if (category) {
				category.data.permissionIds?.push(permission.id)
				category.children.push({
					type: "leaf",
					data: {
						key: permission.id,
						name: permission.name,
						description: permission.description,
						permissionId: permission.id,
						checked: false,
						intermediate: false
					},
					children: []
				})

				categoriesMap.set(category.data.key, category)
			}
		})

		// create tree
		this.categories()
			.filter((category) => category.parent_key)
			.forEach((category) => {
				if (!category.parent_key) {
					return
				}
				const child = categoriesMap.get(category.key)
				// search for intermediate node with parent key and child
				// if have child than is on lower level else is on higher level in tree
				if (!child || child.children.length === 0) {
					return
				}

				this.recursiveMapToTree(child, categoriesMap)
			})

		// create sections
		const sectionsMap = new Map<string, Section>()
		this.sections().forEach((section) => {
			sectionsMap.set(section.key, {
				key: section.key,
				name: section.name,
				description: section.description,
				tree: []
			})
		})

		sectionsMap.set("virtual-section", {
			key: "virtual-section",
			name: "Others",
			description: "Virtual section for orphane permissions.",
			tree: []
		})

		// add tree to sections
		categoriesMap.forEach((category) => {
			const section = sectionsMap.get(category.data.section_key ?? "virtual-section")
			if (section) {
				section.tree.push(category)
				sectionsMap.set(section.key, section)
			}
		})

		console.timeEnd("sections time")
		console.groupEnd()
		return [...sectionsMap.values()]
	})

	checkedTreeSections = computed<Section[]>(() => {
		const checkedSections = structuredClone(this.treeSections())
		console.group("checkedSections Example")
		console.time("checkedSections time")

		checkedSections.map((section) => this.recursiveCheckNodes(section.tree, this.store.permissions()))

		console.timeEnd("checkedSections time")
		console.groupEnd()

		return checkedSections
	})

	saveChanges() {
		console.log("🚀 ~ CheckboxGroupsComponent ~ saveChanges ~ saveChanges:", this.checkedPermissions())

		this.updatePermissions([...this.checkedPermissions()])
	}

	discardChanges() {
		console.log("🚀 ~ CheckboxGroupsComponent ~ discardChanges ~ discardChanges:", this.checkedPermissions())
		// recheck nodes
		this.resetPermissions()
		// set initial checked permission ids
		this.checkedPermissions.set([...this.store.permissions()])
	}

	// check recursively nodes
	recursiveCheckNodes(tree: TreeNode<NodeData>[], permissions: string[]): TreeNode<NodeData>[] {
		tree.map((parent_node) => {
			if (!permissions.some((permission) => parent_node.data.permissionIds?.includes(permission))) {
				return
			}

			parent_node.children.map((child_node) => {
				// Here we can have just two types of nodes: leaf and intermediate
				if (child_node.type === "leaf" && child_node.data.permissionId) {
					child_node.data.checked = permissions.includes(child_node.data.permissionId)
				} else {
					child_node = this.recursiveCheckNodes([child_node], permissions)[0]
					child_node.data.checked = child_node.children.every((node) => node.data.checked)
					child_node.data.intermediate = !child_node.data.checked && child_node.children.some((node) => node.data.checked)
				}
				return child_node
			})

			parent_node.data.checked = parent_node.children.every((node) => node.data.checked)
			parent_node.data.intermediate =
				!parent_node.data.checked &&
				(parent_node.children.some((node) => node.data.checked) ||
					parent_node.children.some((node) => node.data.intermediate))

			return parent_node
		})

		return tree
	}

	recursiveMapToTree(node: TreeNode<NodeData>, map: Map<string, TreeNode<NodeData>>) {
		if (!node.data.parent_key) return

		const parent = map.get(node.data.parent_key)

		if (!parent) return

		parent.children.push(node)
		parent.data.permissionIds?.push(...(node.data.permissionIds ? node.data.permissionIds : []))
		map.set(node.data.key, parent)
		map.delete(node.data.key)

		if (parent.data.parent_key) {
			this.recursiveMapToTree(parent, map)
		}
	}
}
