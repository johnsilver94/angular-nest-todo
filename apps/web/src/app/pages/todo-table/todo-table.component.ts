/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AfterViewInit, Component, ViewChild, OnInit, inject } from "@angular/core"
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { catchError, debounceTime, distinctUntilChanged, map, merge, of, startWith, switchMap } from "rxjs"
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
		MatIconModule
	],
	templateUrl: "./todo-table.component.html",
	styleUrl: "./todo-table.component.scss",
	animations: [ROW_ANIMATION]
})
export class TodoTableComponent implements AfterViewInit, OnInit {
	todosDatasource: MatTableDataSource<Todo> = new MatTableDataSource<Todo>()
	todos: LoadingState<PaginationResponse<Todo>> = { error: null, loading: true }

	isLoading = false
	itemsCount = 0
	pageSize = 10
	displayedColumns = ["id", "title", "description", "completed"]
	queryForm: FormGroup

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

	ngOnInit(): void {
		// form filter listener
		this.queryForm.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((filterValues) => {
			console.log("🚀 ~ TodoTableComponent ~ this.queryForm.valueChanges.pipe ~ filterValues:", filterValues)
		})
	}

	ngAfterViewInit(): void {
		this.todosDatasource.paginator = this.paginator
		this.todosDatasource.sort = this.sort

		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))

		// connect data to table
		merge(
			this.paginator.page,
			this.sort.sortChange,
			this.queryForm.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
		)
			.pipe(
				startWith({}),
				switchMap(({ title }) => {
					this.isLoading = true
					return this.todosService
						.getUsersPaginated({
							pageNumber: this.paginator.pageIndex + 1,
							pageSize: this.paginator.pageSize,
							filterField: "title",
							filterValue: title,
							sortField: this.sort.active,
							sortDirection: this.sort.direction === "asc" ? SortDirection.ASC : SortDirection.DESC
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
			title: new FormControl("")
		})
	}
}
