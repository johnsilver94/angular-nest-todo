import { Routes } from "@angular/router"
import { LayoutComponent } from "./components/layout/layout.component"
import { HomeComponent } from "./pages/home/home.component"
import { todosRoutes } from "./pages/todos/todos.routes"
import { checkboxesRoutes } from "./pages/checkboxes/checkboxes.routes"

export const routes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [{ path: "", component: HomeComponent, pathMatch: "full" }, ...todosRoutes, ...checkboxesRoutes]
	}
]
