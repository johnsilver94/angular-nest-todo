/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AfterViewInit, Component, ViewChild } from "@angular/core"
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { debounceTime, distinctUntilChanged, merge, startWith, switchMap } from "rxjs"
import { ROW_ANIMATION } from "../../animations/row.animation"
import { Todo } from "../../models/todo.model"
import { TodosService } from "../../services/todos.service"
import { CommonModule } from "@angular/common"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatIconModule } from "@angular/material/icon"
import { LoadingState, Paginated, SortDirection } from "../../models/pagination.model"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatButtonModule } from "@angular/material/button"
import { MatMenuModule } from "@angular/material/menu"

@Component({
	selector: "ant-todo-table",
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatTableModule,
		MatInputModule,
		MatSelectModule,
		MatSortModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule
	],
	templateUrl: "./todo-table.component.html",
	styleUrl: "./todo-table.component.scss",
	animations: [ROW_ANIMATION]
})
export class TodoTableComponent implements AfterViewInit {
	todosDatasource: MatTableDataSource<Todo> = new MatTableDataSource<Todo>()
	todos: LoadingState<Paginated<Todo>> = { error: null, loading: false }
	queryForm: FormGroup
	displayedColumns = ["id", "title", "description", "completed", "actions"]

	@ViewChild("paginator", { static: true })
	// @ts-expect-error
	paginator: MatPaginator
	// @ts-expect-error
	@ViewChild(MatSort) sort: MatSort

	constructor(private todosService: TodosService) {
		this.queryForm = this.createQueryForm()
	}

	ngAfterViewInit(): void {
		this.todosDatasource.paginator = this.paginator
		this.todosDatasource.sort = this.sort

		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))

		this.getTodosPaginated()
	}

	getTodosPaginated() {
		merge(
			this.paginator.page,
			this.sort.sortChange,
			this.queryForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
		)
			.pipe(
				startWith({}),
				switchMap(({ title }) =>
					this.todosService.getTodosWithLoader({
						pageNumber: this.paginator.pageIndex + 1,
						pageSize: this.paginator.pageSize,
						filterField: "title",
						filterValue: title,
						sortField: this.sort.active,
						sortDirection: this.sort.direction === "asc" ? SortDirection.ASC : SortDirection.DESC
					})
				)
			)
			.subscribe((todoRes) => {
				this.todos = todoRes

				if (todoRes.data) this.todosDatasource = new MatTableDataSource<Todo>(todoRes?.data?.data)
			})
	}

	clearFilters() {
		this.queryForm.reset(this.createQueryForm().getRawValue())
	}

	createQueryForm() {
		return new FormGroup({
			title: new FormControl("")
		})
	}

	removeTodo(todo: Todo) {
		this.paginator.pageIndex = 0
		this.todosService.deleteTodo(todo.id).subscribe((res) => {
			if (res.data?.success) this.getTodosPaginated()
		})
	}

	editTodo(todo: Todo) {
		console.log("🚀 ~ TodoTableComponent ~ todo:", todo)
	}
}
