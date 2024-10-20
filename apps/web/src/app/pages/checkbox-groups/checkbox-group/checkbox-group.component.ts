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
import { CommonModule } from "@angular/common"
import { CheckBoxTreeNode } from "../../../models/tree.model"

@Component({
	selector: "ant-checkbox-group",
	standalone: true,
	imports: [CommonModule, MatCheckboxModule, FormsModule],
	templateUrl: "./checkbox-group.component.html",
	styleUrl: "./checkbox-group.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupComponent implements OnChanges {
	_node: WritableSignal<CheckBoxTreeNode> = signal<CheckBoxTreeNode>({} as CheckBoxTreeNode)

	@Output() childChecked = new EventEmitter<{ completed: boolean; name: string }>()

	@Input()
	set node(data: CheckBoxTreeNode) {
		this._node.set(data)
	}

	get node(): WritableSignal<CheckBoxTreeNode> {
		return this._node
	}

	get treeNodes(): CheckBoxTreeNode[] {
		const node = this.node()
		if (node.type === "leaf") return []
		return node.childrens
	}

	ngOnChanges(changes: SimpleChanges) {
		const nodeChanges = changes["node"]
		const currentCompleted = (changes["node"].currentValue as CheckBoxTreeNode).data.completed

		if (!nodeChanges.firstChange) this.update(currentCompleted)
	}

	readonly partiallyComplete = computed(() => {
		const node = this.node()
		if (node.type === "leaf" || node.type === "virtual" || !node.childrens) return false

		return node.childrens.some((t) => t.data.completed) && !node.childrens.every((t) => t.data.completed)
	})

	// On child checkbox update, emit event to parent component. only for
	onChildChecked({ completed, name }: { completed: boolean; name: string }) {
		const node = this.node()

		if (node.type === "virtual" || node.type === "leaf") return

		this.update(
			completed,
			node.childrens?.findIndex((t) => t.data.name === name)
		)
	}

	update(completed: boolean, index?: number) {
		this.node.update((node) => {
			// there are no need to update virtual or leaf node
			if (node.type === "virtual" || node.type === "leaf") return node

			// check parent checkbox
			if (index === undefined) {
				node.data.completed = completed

				node.childrens = node.childrens?.map(({ data, ...rest }) => ({ ...rest, data: { ...data, completed } }))

				// check children checkbox
			} else {
				const completedChildren = node.childrens[index]
				completedChildren.data.completed = completed
				node.data.completed = node.childrens?.every((t) => t.data.completed) ?? true
			}

			this.childChecked.emit({ name: node.data.name, completed: node.data.completed })

			return { ...node }
		})
	}
}
