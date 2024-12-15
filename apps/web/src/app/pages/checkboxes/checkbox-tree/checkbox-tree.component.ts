import { ChangeDetectionStrategy, Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { CheckBoxTreeNode } from "../../../models/tree.model"
import { CheckboxGroupComponent } from "./checkbox-group/checkbox-group.component"

@Component({
	selector: "ant-checkbox-tree",
	standalone: true,
	imports: [MatCheckboxModule, FormsModule, CheckboxGroupComponent],
	templateUrl: "./checkbox-tree.component.html",
	styleUrl: "./checkbox-tree.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxTreeComponent {
	checkBoxTree: CheckBoxTreeNode[] = [
		{
			type: "parent",
			data: { name: "Task 1", completed: false },
			children: [
				{
					type: "intermediate",
					data: { name: "Task 1.1", completed: false },
					children: [
						{
							type: "leaf",
							data: { name: "Task 1.1.1", completed: true },
							children: []
						},
						{
							type: "leaf",
							data: { name: "Task 1.1.2", completed: false },
							children: []
						},
						{
							type: "leaf",
							data: { name: "Task 1.1.3", completed: false },
							children: []
						}
					]
				},
				{
					type: "intermediate",
					data: { name: "Task 1.2", completed: false },
					children: [
						{
							type: "intermediate",
							data: { name: "Task 1.2.1", completed: false },
							children: [
								{
									type: "leaf",
									data: { name: "Task 1.2.1.1", completed: false },
									children: []
								},
								{
									type: "leaf",
									data: { name: "Task 1.2.1.2", completed: false },
									children: []
								}
							]
						},
						{
							type: "intermediate",
							data: { name: "Task 1.2.2", completed: false },
							children: [
								{
									type: "leaf",
									data: { name: "Task 1.2.2.1", completed: false },
									children: []
								},
								{
									type: "leaf",
									data: { name: "Task 1.2.2.2", completed: false },
									children: []
								}
							]
						}
					]
				},
				{ type: "leaf", data: { name: "Task 1.3", completed: false }, children: [] },
				{ type: "leaf", data: { name: "Task 1.4", completed: false }, children: [] }
			]
		},
		{
			type: "virtual",
			data: { name: "Task 2", completed: false },
			children: [
				{ type: "leaf", data: { name: "Task 2.1", completed: false }, children: [] },
				{ type: "leaf", data: { name: "Task 2.2", completed: false }, children: [] },
				{ type: "leaf", data: { name: "Task 2.3", completed: false }, children: [] }
			]
		},
		{
			type: "parent",
			data: { name: "Task 3", completed: false },
			children: [
				{
					type: "intermediate",
					data: { name: "Task 3.1", completed: false },
					children: [
						{
							type: "intermediate",
							data: {
								name: "Task 3.1.1",
								completed: false
							},
							children: [
								{
									type: "intermediate",
									data: { name: "Task 3.1.1.1", completed: false },
									children: [
										{ type: "leaf", data: { name: "Task 3.1.1.1.1", completed: false }, children: [] },
										{ type: "leaf", data: { name: "Task 3.1.1.1.2", completed: false }, children: [] },
										{
											type: "intermediate",
											data: { name: "Task 3.1.1.1.3", completed: false },
											children: [
												{
													type: "leaf",
													data: { name: "Task 3.1.1.1.3.1", completed: false },
													children: []
												}
											]
										}
									]
								}
							]
						},
						{ type: "leaf", data: { name: "Task 3.1.2", completed: false }, children: [] },
						{ type: "leaf", data: { name: "Task 3.1.3", completed: false }, children: [] }
					]
				}
			]
		}
	]
}
