import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals"
import { tapResponse } from "@ngrx/operators"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { Todo } from "../../models/todo.model"
import { PaginationResponse, QueryOptions, SortDirection } from "../../models/pagination.model"
import { inject } from "@angular/core"
import { TodosService } from "../../services/todos.service"
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs"
import { MatTableDataSource } from "@angular/material/table"

type TodosState = {
	todos: PaginationResponse<Todo>
	todosDatasource: MatTableDataSource<Todo>
	isLoading: boolean
	query: QueryOptions
}

const initialState: TodosState = {
	todos: { data: [], pagination: { pageNumber: 1, pageSize: 10, pagesCount: 0, itemsCount: 0 } },
	todosDatasource: new MatTableDataSource<Todo>(),
	query: {
		pageNumber: 1,
		pageSize: 10,
		filterField: "title",
		filterValue: "",
		sortField: "id",
		sortDirection: SortDirection.DESC
	},
	isLoading: false
}

export const TodosStore = signalStore(
	withState(initialState),
	withMethods((store, todosService = inject(TodosService)) => ({
		updateQuery: (query: Partial<QueryOptions>) => {
			patchState(store, (state) => ({ query: { ...state.query, ...query } }))
		},
		getTodosQuery: rxMethod<QueryOptions>(
			pipe(
				debounceTime(500),
				distinctUntilChanged(),
				tap(() => patchState(store, { isLoading: true, todos: initialState.todos })),
				switchMap((query) => {
					console.log("🚀 ~ switchMap ~ query:", query)
					return todosService.getTodos(query).pipe(
						tapResponse({
							next: (todos) => patchState(store, { todos, todosDatasource: new MatTableDataSource(todos.data) }),
							error: console.error,
							finalize: () => patchState(store, { isLoading: false })
						})
					)
				})
			)
		)
	})),
	withHooks({
		onInit({ getTodosQuery, query }) {
			getTodosQuery(query)
		}
	})
)
