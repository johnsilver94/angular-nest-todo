/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, inject } from "@angular/core"
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatSort, MatSortModule } from "@angular/material/sort"
import { MatTableModule } from "@angular/material/table"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { ROW_ANIMATION } from "../../animations/row.animation"
import { Todo } from "../../models/todo.model"
import { TodosService } from "../../services/todos.service"
import { CommonModule } from "@angular/common"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { MatIconModule } from "@angular/material/icon"
import { SortDirection } from "../../models/pagination.model"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatButtonModule } from "@angular/material/button"
import { MatMenuModule } from "@angular/material/menu"
import { TodosStore } from "./todos.store"

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
		MatMenuModule
	],
	templateUrl: "./ngrx-todos.component.html",
	styleUrl: "./ngrx-todos.component.scss",
	animations: [ROW_ANIMATION],
	providers: [TodosStore],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxTodosComponent implements AfterViewInit {
	readonly store = inject(TodosStore)
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

	ngInit(): void {
		const query = this.store.query

		this.store.getTodosQuery(query)
	}

	ngAfterViewInit(): void {
		this.store.todosDatasource().paginator = this.paginator
		this.store.todosDatasource().sort = this.sort

		this.sort.sortChange.subscribe(({ active, direction }) => {
			this.store.updateQuery({
				pageNumber: 0,
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
		this.todosService.deleteTodo(todo.id).subscribe(() => {
			// if (res.data?.success) this.getTodosPaginated()
		})
	}

	editTodo(todo: Todo) {
		console.log("🚀 ~ TodoTableComponent ~ todo:", todo)
	}
}
