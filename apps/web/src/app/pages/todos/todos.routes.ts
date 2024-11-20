import { Routes } from "@angular/router"
import { TodosComponent } from "./todos.component"
import { CdkTableComponent } from "./cdk-table/cdk-table.component"
import { MaterialTableComponent } from "./material-table/material-table.component"
import { NgrxCrudComponent } from "./ngrx-crud/ngrx-crud.component"
import { NgrxTodosComponent } from "./ngrx-todos/ngrx-todos.component"
import { NgrxEntitiesTodoComponent } from "./ngrx-entities/ngrx-entities.component"

export const todosRoutes: Routes = [
	{
		path: "todos",
		children: [
			{ path: "", component: TodosComponent },
			{ path: "cdk", component: CdkTableComponent },
			{ path: "material", component: MaterialTableComponent },
			{ path: "ngrx-crud", component: NgrxCrudComponent },
			{ path: "ngrx-todos", component: NgrxTodosComponent },
			{ path: "ngrx-entities", component: NgrxEntitiesTodoComponent }
		]
	}
]
