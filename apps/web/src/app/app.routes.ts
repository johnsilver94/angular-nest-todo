import { Routes } from "@angular/router"
import { MaterialTableComponent } from "./pages/material-table/material-table.component"
import { CdkTableComponent } from "./pages/cdk-table/cdk-table.component"
import { TodoTableComponent } from "./pages/todo-table/todo-table.component"

export const routes: Routes = [
	{ path: "material", component: MaterialTableComponent },
	{ path: "cdk", component: CdkTableComponent },
	{ path: "todos", component: TodoTableComponent }
]
