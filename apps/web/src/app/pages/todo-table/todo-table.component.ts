/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AfterViewInit, Component, ViewChild } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CdkTableModule } from "@angular/cdk/table"
import { MatSort, MatSortable, MatSortModule } from "@angular/material/sort"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { catchError, map, of, startWith, Subject, switchMap } from "rxjs"
import { HighlightSearch } from "../../pipes/highlight.pipe"
import { PaginatorComponent } from "../../components/paginator/paginator.component"
import { UserQuery } from "../../query/users.query"
import { ROW_ANIMATION } from "../../animations/row.animation"
import { Todo } from "../../models/todo.model"
import { TodosService } from "../../services/todo.service"
import { CommonModule } from "@angular/common"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatPaginatorModule } from "@angular/material/paginator"

@Component({
	selector: "ant-todo-table",
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		CdkTableModule,
		ReactiveFormsModule,
		RouterOutlet,
		HighlightSearch,
		PaginatorComponent,
		MatTableModule,
		MatInputModule,
		MatSelectModule,
		MatSortModule,
		MatPaginatorModule,
		MatProgressBarModule
	],
	templateUrl: "./todo-table.component.html",
	styleUrl: "./todo-table.component.scss",
	providers: [UserQuery, HighlightSearch],
	animations: [ROW_ANIMATION]
})
export class TodoTableComponent implements AfterViewInit {
	todosDatasource: MatTableDataSource<Todo> = new MatTableDataSource<Todo>()
	initialSort: MatSortable = {
		id: "id",
		start: "desc",
		disableClear: false
	}

	isLoading = false
	itemsCount = 0
	displayedColumns = ["id", "title", "description", "completed"]
	queryForm: FormGroup

	nameQueryChanged: Subject<string> = new Subject<string>()
	@ViewChild("pagination", { static: true })
	// @ts-expect-error
	paginator: PaginatorComponent
	// @ts-expect-error
	@ViewChild(MatSort, { static: true }) sort: MatSort
	pageSize = 10

	constructor(
		private todosService: TodosService,
		public userQuery: UserQuery
	) {
		this.queryForm = this.createQueryForm()
	}

	// ngOnInit(): void {

	// }

	ngAfterViewInit(): void {
		this.todosDatasource.paginator = this.paginator
		// connect data to table
		this.paginator.page
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoading = true
					return this.todosService
						.getUsersPaginated({
							pageNumber: this.paginator.pageIndex + 1,
							pageSize: this.paginator.pageSize
						})
						.pipe(catchError(() => of(null)))
				}),
				map((resData) => {
					console.log("🚀 ~ TodoTableComponent ~ map ~ resData:", resData)
					if (resData == null) return []
					this.itemsCount = resData.pagination.itemsCount
					this.isLoading = false
					return resData.data
				})
			)
			.subscribe((data) => {
				console.log("🚀 ~ TodoTableComponent ~ .subscribe ~ data:", data)
				this.todosDatasource = new MatTableDataSource<Todo>(data)
			})
	}

	clearFilters() {
		this.queryForm.reset(this.createQueryForm().getRawValue())
	}

	createQueryForm() {
		return new FormGroup({
			title: new FormControl(""),
			description: new FormControl("")
		})
	}
}
