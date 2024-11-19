import { ChangeDetectionStrategy, Component, computed, model, output } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { CommonModule } from "@angular/common"
import { CheckBoxTreeNode } from "../../../../models/tree.model"

type CheckBoxGroupUpdate = { completed: boolean; name: string }

@Component({
	selector: "ant-checkbox-group",
	standalone: true,
	imports: [CommonModule, MatCheckboxModule, FormsModule],
	templateUrl: "./checkbox-group.component.html",
	styleUrl: "./checkbox-group.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupComponent {
	group = model.required<CheckBoxTreeNode>()

	onGroupUpdate = output<CheckBoxGroupUpdate>({
		alias: "onUpdate"
	})

	children = computed<CheckBoxTreeNode[]>(() => {
		const group = this.group()
		return group.type === "leaf" ? [] : group.children
	})

	intermediate = computed<boolean>(() => {
		const group = this.group()
		if (group.type === "leaf" || group.type === "virtual" || !group.children) return false

		return group.children.some((t) => t.data.completed) && !group.children.every((t) => t.data.completed)
	})

	// On child checkbox update, emit event to parent component. only for
	onChildUpdate({ completed, name }: CheckBoxGroupUpdate) {
		const group = this.group()
		if (group.type === "virtual" || group.type === "leaf") return
		this.update(
			completed,
			group.children?.findIndex((t) => t.data.name === name)
		)
	}

	update(completed: boolean, index?: number) {
		this.group.update((node) => {
			// there are no need to update virtual or leaf node
			if (node.type === "virtual" || node.type === "leaf") return node

			// check parent checkbox
			if (index === undefined) {
				node.data.completed = completed

				// check all children
				node.children = node.children?.map(({ data, ...rest }) => ({ ...rest, data: { ...data, completed } }))

				// check children checkbox
			} else {
				const completedChildren = node.children[index]
				completedChildren.data.completed = completed
				node.data.completed = node.children?.every((t) => t.data.completed) ?? true
			}

			this.onGroupUpdate.emit({ name: node.data.name, completed: node.data.completed })

			return { ...node }
		})
	}
}
