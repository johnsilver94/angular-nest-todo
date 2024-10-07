import { Routes } from "@angular/router"
import { MaterialTableComponent } from "./pages/material-table/material-table.component"
import { CdkTableComponent } from "./pages/cdk-table/cdk-table.component"
import { TodoTableComponent } from "./pages/todo-table/todo-table.component"
import { ElfTodosComponent } from "./pages/elf-todos/elf-todos.component"
import { NgrxTodosComponent } from "./pages/ngrx-todos/ngrx-todos.component"
import { CRUDTodoComponent } from "./pages/crud-todo/crud-todo.component"

export const routes: Routes = [
	{ path: "material", component: MaterialTableComponent },
	{ path: "cdk", component: CdkTableComponent },
	{ path: "todos", component: TodoTableComponent },
	{ path: "elf-todos", component: ElfTodosComponent },
	{ path: "ngrx-todos", component: NgrxTodosComponent },
	{ path: "crud-todo", component: CRUDTodoComponent }
]
