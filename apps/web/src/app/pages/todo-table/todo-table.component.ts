/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AfterViewInit, Component, ViewChild, inject } from "@angular/core"
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { debounceTime, distinctUntilChanged, merge, startWith, switchMap } from "rxjs"
import { ROW_ANIMATION } from "../../animations/row.animation"
import { Todo } from "../../models/todo.model"
import { TodosService } from "../../services/todo.service"
import { CommonModule } from "@angular/common"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatIconModule, MatIconRegistry } from "@angular/material/icon"
import { LoadingState, PaginationResponse, SortDirection } from "../../models/pagination.model"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatButtonModule } from "@angular/material/button"
import { MatMenuModule } from "@angular/material/menu"
import { DomSanitizer } from "@angular/platform-browser"

const SVG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
`

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
	todos: LoadingState<PaginationResponse<Todo>> = { error: null, loading: false }
	queryForm: FormGroup
	displayedColumns = ["id", "title", "description", "completed", "actions"]

	@ViewChild("paginator", { static: true })
	// @ts-expect-error
	paginator: MatPaginator
	// @ts-expect-error
	@ViewChild(MatSort) sort: MatSort

	constructor(private todosService: TodosService) {
		this.queryForm = this.createQueryForm()
		const iconRegistry = inject(MatIconRegistry)
		const sanitizer = inject(DomSanitizer)

		iconRegistry.addSvgIconLiteral("remove", sanitizer.bypassSecurityTrustHtml(SVG_ICON))
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
					this.todosService.getUsersPaginated({
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
