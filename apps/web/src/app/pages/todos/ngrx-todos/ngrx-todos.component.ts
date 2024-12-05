/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CommonModule } from "@angular/common"
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, effect, inject } from "@angular/core"
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
import { MatTableModule } from "@angular/material/table"
import { ROW_ANIMATION } from "../../../animations/row.animation"
import { SortDirection } from "../../../models/pagination.model"
import { Todo } from "../../../models/todo.model"
import { TodosService } from "../../../services/todos.service"
import { CreateEditTodoComponent } from "./create-edit-todo/create-edit-todo.component"
import { TodosStore } from "./store/ngrx-todos.store"
import { ViewTodoComponent } from "./view-todo/view-todo.component"

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

	readonly todosDatasource = this.store.todosDatasource
	readonly isLoading = this.store.isLoading
	readonly paginationLength = this.store.todos.pagination.itemsCount
	readonly query = this.store.query
	readonly getTodosByQuery = this.store.getTodosByQuery
	readonly deleteTodo = this.store.deleteTodo

	queryForm: FormGroup
	displayedColumns = ["id", "title", "createdAt", "updatedAt", "completed", "actions"]

	isOpened = false
	selectedTodo?: Todo

	@ViewChild("paginator", { static: true })
	// @ts-expect-error
	paginator: MatPaginator
	// @ts-expect-error
	@ViewChild(MatSort) sort: MatSort

	@ViewChild(ViewTodoComponent) viewModal!: ViewTodoComponent
	@ViewChild(CreateEditTodoComponent) createEditModal!: CreateEditTodoComponent

	constructor(private todosService: TodosService) {
		this.queryForm = this.createQueryForm()
		effect(() => {
			console.log("🚀 ~ NgrxTodosComponent ~ isOpened:", this.isOpened)
		})
	}

	ngInit(): void {
		this.getTodosByQuery(this.query)
	}

	ngAfterViewInit(): void {
		const { pageSize } = this.store.query()
		this.paginator.pageSize = pageSize
		this.store.todosDatasource().paginator = this.paginator
		this.store.todosDatasource().sort = this.sort

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
			console.log("🚀 ~ NgrxTodosComponent ~ this.paginator.page.subscribe ~ pageIndex:", pageIndex, this.store.query())
		})

		this.queryForm.valueChanges.subscribe(({ title }) => {
			console.log("🚀 ~ NgrxTodosComponent ~ this.queryForm.valueChanges.subscribe ~ title:", title, this.store.query())
			this.store.updateQuery({
				filterValue: title || ""
			})
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
		this.deleteTodo(todo.id)
	}

	viewTodo(todo: Todo) {
		this.selectedTodo = todo
		this.viewModal.open.set(true)
	}

	editTodo(todo: Todo) {
		this.selectedTodo = todo
		this.createEditModal.mode.set("edit")
		this.createEditModal.open.set(true)
	}

	addTodo() {
		this.selectedTodo = {
			id: -1,
			title: "New Todo",
			description: "",
			completed: false,
			createdAt: "",
			updatedAt: ""
		}
		this.createEditModal.mode.set("create")
		this.createEditModal.open.set(true)
	}
}
