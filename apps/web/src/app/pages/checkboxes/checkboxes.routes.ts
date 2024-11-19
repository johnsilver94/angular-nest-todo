import { Routes } from "@angular/router"
import { CheckboxTreeComponent } from "./checkbox-tree/checkbox-tree.component"
import { CheckboxGroupsComponent } from "./checkbox-groups/checkbox-groups.component"

export const checkboxesRoutes: Routes = [
	{
		path: "checkboxes",
		children: [
			{ path: "tree", component: CheckboxTreeComponent },
			{ path: "groups", component: CheckboxGroupsComponent }
		]
	}
]
