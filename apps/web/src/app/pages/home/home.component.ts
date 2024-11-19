import { Component } from "@angular/core"
import { RouterLink } from "@angular/router"

@Component({
	selector: "ant-home",
	templateUrl: "./home.component.html",
	standalone: true,
	imports: [RouterLink]
})
export class HomeComponent {
	features = [
		{ name: "CDK Table", route: "/cdk" },
		{ name: "Material Table", route: "/material" },
		{ name: "Todos Table", route: "/todos" },
		{ name: "Ngrx Todos", route: "/ngrx-todos" },
		{ name: "CRUD Todos", route: "/crud-todo" },
		{ name: "NGRX Entities", route: "/ngrx-entities" },
		{ name: "Checkbox Groups", route: "/checkbox-groups" },
		{ name: "Checkbox Tree", route: "/checkbox-tree" }
	]
}
