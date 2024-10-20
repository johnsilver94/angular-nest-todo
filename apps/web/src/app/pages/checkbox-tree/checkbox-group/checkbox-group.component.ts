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
	_group: WritableSignal<CheckBoxTreeNode> = signal<CheckBoxTreeNode>({} as CheckBoxTreeNode)

	@Output() childChecked = new EventEmitter<{ completed: boolean; name: string }>()

	@Input()
	set group(data: CheckBoxTreeNode) {
		this._group.set(data)
	}

	get group(): WritableSignal<CheckBoxTreeNode> {
		return this._group
	}

	get nodeChildrens(): CheckBoxTreeNode[] {
		const group = this.group()
		if (group.type === "leaf") return []
		return group.childrens
	}

	ngOnChanges(changes: SimpleChanges) {
		const taskChanges = changes["group"]
		const currentCompleted = (changes["group"].currentValue as CheckBoxTreeNode).data.completed

		if (!taskChanges.firstChange) this.update(currentCompleted)
	}

	readonly partiallyComplete = computed(() => {
		const group = this.group()
		if (group.type === "leaf" || group.type === "virtual" || !group.childrens) return false

		return group.childrens.some((t) => t.data.completed) && !group.childrens.every((t) => t.data.completed)
	})

	// On child checkbox update, emit event to parent component. only for
	onChildChecked({ completed, name }: { completed: boolean; name: string }) {
		const group = this.group()

		if (group.type === "virtual" || group.type === "leaf") return

		this.update(
			completed,
			group.childrens?.findIndex((t) => t.data.name === name)
		)
	}

	update(completed: boolean, index?: number) {
		this.group.update((group) => {
			// there are no need to update virtual or leaf node
			if (group.type === "virtual" || group.type === "leaf") return group

			// check parent checkbox
			if (index === undefined) {
				group.data.completed = completed

				group.childrens = group.childrens?.map(({ data, ...rest }) => ({ ...rest, data: { ...data, completed } }))

				// check children checkbox
			} else {
				const completedChildren = group.childrens[index]
				completedChildren.data.completed = completed
				group.data.completed = group.childrens?.every((t) => t.data.completed) ?? true
			}

			this.childChecked.emit({ name: group.data.name, completed: group.data.completed })

			return { ...group }
		})
	}
}
