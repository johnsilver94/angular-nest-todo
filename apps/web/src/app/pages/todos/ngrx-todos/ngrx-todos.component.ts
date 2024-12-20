import { CommonModule } from "@angular/common"
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, computed, inject } from "@angular/core"
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatMenuModule } from "@angular/material/menu"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatSelectModule } from "@angular/material/select"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import { ROW_ANIMATION } from "../../../animations/row.animation"
import { SortDirection } from "../../../models/pagination.model"
import { Todo } from "../../../models/todo.model"
import { CreateEditTodoComponent } from "./create-edit-todo/create-edit-todo.component"
import { TodosStore } from "./store/ngrx-todos.store"
import { ViewTodoComponent } from "./view-todo/view-todo.component"

type FilterForm = {
	title: FormControl<string>
}

@Component({
	selector: "ant-ngrx-todos",
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
		MatMenuModule,
		ViewTodoComponent,
		CreateEditTodoComponent
	],
	templateUrl: "./ngrx-todos.component.html",
	styleUrl: "./ngrx-todos.component.scss",
	animations: [ROW_ANIMATION],
	providers: [TodosStore],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxTodosComponent implements AfterViewInit {
	readonly store = inject(TodosStore)

	readonly isLoading = this.store.isLoading
	readonly paginationLength = this.store.pagination.itemsCount
	readonly query = this.store.query
	readonly getTodosPaginatedByQuery = this.store.getAllPaginated
	readonly deleteTodo = this.store.deleteOne
	readonly todoEntitySelect = this.store.todoEntitySelect
	readonly getOneTodo = this.store.getOne
	readonly todoEntities = this.store.todoEntities

	queryForm: FormGroup<FilterForm> = new FormGroup({
		title: new FormControl("", { nonNullable: true })
	})

	displayedColumns: { key: string; name: string }[] = [
		{ key: "id", name: "ID" },
		{ key: "title", name: "Title" },
		{ key: "createdAt", name: "Created At" },
		{ key: "updatedAt", name: "Updated At" },
		{ key: "completed", name: "Completed" },
		{ key: "actions", name: "Actions" }
	]

	columnsToDisplay = this.displayedColumns.map((column) => column.key)

	isOpened = false

	@ViewChild("paginator", { static: true })
	paginator!: MatPaginator
	@ViewChild(MatSort) sort!: MatSort

	@ViewChild(ViewTodoComponent) viewModal!: ViewTodoComponent
	@ViewChild(CreateEditTodoComponent) createEditModal!: CreateEditTodoComponent

	ngInit(): void {
		this.getTodosPaginatedByQuery(this.query)
	}

	todosDatasource = computed(() => new MatTableDataSource(this.todoEntities()))

	ngAfterViewInit(): void {
		const { pageSize } = this.store.query()
		this.paginator.pageSize = pageSize
		this.todosDatasource().paginator = this.paginator
		this.todosDatasource().sort = this.sort

		this.sort.sortChange.subscribe(({ active, direction }) => {
			this.store.updateQuery({
				sortField: active,
				sortDirection: direction === "asc" ? SortDirection.ASC : SortDirection.DESC
			})
		})
		this.paginator.page.subscribe(({ pageIndex, pageSize }) => {
			this.store.updateQuery({
				pageNumber: pageIndex + 1,
				pageSize: pageSize
			})
		})

		this.queryForm.valueChanges.subscribe(({ title }) => {
			this.store.updateQuery({
				filterValue: title || ""
			})
		})
	}

	clearFilters() {
		this.queryForm.reset()
	}

	removeTodo(todo: Todo) {
		this.paginator.pageIndex = 0
		this.deleteTodo({ id: todo.id })
	}

	viewTodo(todo: Todo) {
		this.todoEntitySelect(todo.id)
		this.viewModal.open.set(true)
	}

	editTodo(todo: Todo) {
		this.todoEntitySelect(todo.id)
		this.createEditModal.mode.set("edit")
		this.createEditModal.open.set(true)
	}

	addTodo() {
		this.createEditModal.mode.set("create")
		this.createEditModal.open.set(true)
	}
}
