import { computed, inject } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { tapResponse } from "@ngrx/operators"
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs"
import { Paginated, QueryOptions, SortDirection } from "../../../models/pagination.model"
import { Todo } from "../../../models/todo.model"
import { TodosService } from "../../../services/todos.service"

type TodosState = {
	todos: Paginated<Todo>
	// todosDatasource: MatTableDataSource<Todo>
	isLoading: boolean
	query: QueryOptions
}

const initialState: TodosState = {
	todos: { data: [], pagination: { pageNumber: 1, pageSize: 10, pagesCount: 0, itemsCount: 0 } },
	// todosDatasource: new MatTableDataSource<Todo>(),
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
	{ providedIn: "root" },
	withState(initialState),
	// withSele
	withComputed(({ todos }) => ({
		todosDatasource: computed(() => new MatTableDataSource(todos().data))
	})),
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
					return todosService.getTodosPaginated(query).pipe(
						tapResponse({
							next: (todos) => patchState(store, { todos }),
							error: console.error,
							finalize: () => patchState(store, { isLoading: false })
						})
					)
				})
			)
		)
	})),
	withHooks({
		onInit(store) {
			console.log("Store initialized", store)
			store.getTodosQuery(store.query)
		},
		onDestroy: (store) => console.log("Store destroyed", store)
	})
)
