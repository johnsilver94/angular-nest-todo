import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"

type NavRoute = { path: string; name: string; subRoutes?: NavRoute[] }

@Component({
	selector: "ant-layout",
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: "./layout.component.html"
})
export class LayoutComponent {
	readonly routes: NavRoute[] = [
		{
			path: "/",
			name: "Home"
		},
		{
			path: "/todos",
			name: "Todos",
			subRoutes: [
				{
					path: "/todos/cdk",
					name: "Cdk Table"
				},
				{
					path: "/todos/material",
					name: "Material Table"
				},
				{
					path: "/todos/ngrx-crud",
					name: "Ngrx Crud"
				},
				{
					path: "/todos/ngrx-todos",
					name: "Ngrx Todos"
				},
				{
					path: "/todos/ngrx-entities",
					name: "Ngrx Entities"
				}
			]
		},
		{
			path: "/checkboxes",
			name: "Checkboxes",
			subRoutes: [
				{
					path: "/checkboxes/groups",
					name: "Checkbox Groups"
				},
				{
					path: "/checkboxes/tree",
					name: "Checkbox Tree"
				}
			]
		}
	]
}
