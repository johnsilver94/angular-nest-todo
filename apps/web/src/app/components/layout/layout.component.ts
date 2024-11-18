import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"

type NavRoute = { path: string; name: string }

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
			path: "/cdk",
			name: "Cdk Table"
		},
		{
			path: "/material",
			name: "Material Table"
		},
		{
			path: "/todos",
			name: "Todos Table"
		},
		{
			path: "/elf-todos",
			name: "Elf Todos"
		},
		{
			path: "/ngrx-todos",
			name: "Ngrx Todos"
		},
		{
			path: "/crud-todo",
			name: "CRUD Todos"
		},
		{
			path: "/ngrx-entities",
			name: "NGRX Entities"
		},
		{
			path: "/checkbox-groups",
			name: "Checkbox Groups"
		},
		{
			path: "/checkbox-tree",
			name: "Checkbox Tree"
		}
	]
}
