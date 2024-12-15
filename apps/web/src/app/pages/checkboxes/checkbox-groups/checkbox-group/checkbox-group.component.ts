import { CommonModule } from "@angular/common"
import { ChangeDetectionStrategy, Component, model, output } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { NodeData, TreeNode } from "../checkbox-groups.component"

@Component({
	selector: "ant-checkbox-group",
	standalone: true,
	imports: [CommonModule, MatCheckboxModule, FormsModule],
	templateUrl: "./checkbox-group.component.html",
	styleUrl: "./checkbox-group.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupComponent {
	group = model.required<TreeNode<NodeData>>()
	permissions = model.required<string[]>()

	onGroupUpdate = output<TreeNode<NodeData>>({
		alias: "onUpdate"
	})

	// children = computed(() => this.group().children)

	// On child checkbox update, emit event to parent component.
	onChildUpdate(node: TreeNode<NodeData>) {
		const group = this.group()
		if (group.type === "virtual" || group.type === "leaf") return
		this.update(node.data.checked, node.data.key)
	}

	update(checked: boolean, key?: string) {
		this.group.update((node) => {
			// there are no need to update virtual or leaf node
			if (node.type === "virtual" || node.type === "leaf") return node

			// check parent checkbox
			if (key === undefined) {
				node.data.checked = checked
				node.data.intermediate = false

				// check all children recursively
				this.recursiveCheckNodes(node.children, checked)

				// check children checkbox
			} else {
				const child = node.children[node.children.findIndex((t) => t.data.key === key)]
				child.data.checked = checked
				child.data.intermediate =
					!checked &&
					(child.children.some((node) => node.data.checked) || child.children.some((node) => node.data.intermediate))

				node.data.checked = node.children.every((t) => t.data.checked)
				node.data.intermediate =
					!node.data.checked &&
					(node.children.some((node) => node.data.checked) || node.children.some((node) => node.data.intermediate))

				if (child.type === "leaf") {
					this.checkPermission(checked, child.data.key)
				}
			}

			this.onGroupUpdate.emit(node)

			return structuredClone(node)
		})
	}

	recursiveCheckNodes(nodes: TreeNode<NodeData>[], checked: boolean): TreeNode<NodeData>[] {
		nodes.map((parent_node) => {
			parent_node.data.checked = checked
			parent_node.data.intermediate = false

			if (parent_node.type === "leaf") {
				this.checkPermission(parent_node.data.checked, parent_node.data.key)
			} else {
				parent_node.children = this.recursiveCheckNodes(parent_node.children, checked)
			}

			return parent_node
		})

		return nodes
	}

	checkPermission(checked: boolean, key: string) {
		this.permissions.update((permissions) => {
			const idx = permissions.findIndex((p) => p === key)
			if (checked) {
				if (idx === -1) permissions.push(key)
			} else {
				if (idx !== -1) permissions.splice(idx, 1)
			}
			return permissions
		})
	}
}
