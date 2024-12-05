import { computed, inject } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { tapResponse } from "@ngrx/operators"
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { addEntities, entityConfig, removeAllEntities, updateEntity, withEntities } from "@ngrx/signals/entities"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs"
import { Paginated, QueryOptions, SortDirection } from "../../../../models/pagination.model"
import { Todo } from "../../../../models/todo.model"
import { CreateTodo, UpdateTodo } from "../models/todo.model"
import { TodosService } from "../services/todos.service"

type TodosState = {
	todos: Paginated<Todo>
	pagination: {
		pageNumber: number
		pageSize: number
		pagesCount: number
		itemsCount: number
	}
	isLoading: boolean
	query: QueryOptions
}

const initialState: TodosState = {
	todos: { data: [], pagination: { pageNumber: 1, pageSize: 10, pagesCount: 0, itemsCount: 0 } },
	pagination: { pageNumber: 1, pageSize: 10, pagesCount: 0, itemsCount: 0 },
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

const todoConfig = entityConfig({
	entity: type<Todo>(),
	collection: "todo",
	selectId: (todo) => todo.id
})

export const TodosStore = signalStore(
	withState(initialState),
	withEntities(todoConfig),
	withComputed(({ todoEntities }) => ({
		todosDatasource: computed(() => new MatTableDataSource(todoEntities()))
	})),
	withMethods((store, todosService = inject(TodosService)) => ({
		updateQuery: (query: Partial<QueryOptions>) => {
			patchState(store, (state) => ({ query: { ...state.query, ...query } }))
		},
		getTodosByQuery: rxMethod<QueryOptions>(
			pipe(
				debounceTime(500),
				distinctUntilChanged(),
				tap(() => {
					patchState(store, { isLoading: true, todos: initialState.todos })
					patchState(store, removeAllEntities(todoConfig))
				}),
				switchMap((query) => {
					console.log("🚀 ~ switchMap ~ query:", query)
					return todosService.getTodosPaginated(query).pipe(
						tapResponse({
							next: (todos) => {
								console.log("🚀 ~ switchMap ~ todos:", todos)
								patchState(store, addEntities(todos.data, todoConfig))
								return patchState(store, { todos, pagination: todos.pagination })
							},
							error: console.error,
							finalize: () => patchState(store, { isLoading: false })
						})
					)
				})
			)
		),
		addTodo: rxMethod<CreateTodo>(
			pipe(
				tap(() => patchState(store, { isLoading: true })),
				switchMap((createData) => {
					console.log("🚀 ~ switchMap ~ addTodo:", createData)
					return todosService.addTodo(createData).pipe(
						tapResponse({
							next: () => patchState(store, { query: { ...store.query() } }),
							error: console.error,
							finalize: () => patchState(store, { isLoading: false })
						})
					)
				})
			)
		),
		updateTodo: rxMethod<UpdateTodo>(
			pipe(
				tap(() => patchState(store, { isLoading: true })),
				switchMap((updateData) => {
					console.log("🚀 ~ switchMap ~ updateTodo:", updateData)
					return todosService.updateTodo(updateData).pipe(
						tapResponse({
							next: () => {
								const { id, ...data } = updateData
								patchState(
									store,
									updateEntity(
										{
											id,
											changes: () => data
										},
										todoConfig
									)
								)
							},
							error: console.error,
							finalize: () => patchState(store, { isLoading: false })
						})
					)
				})
			)
		),
		deleteTodo: rxMethod<number>(
			pipe(
				tap(() => patchState(store, { isLoading: true })),
				switchMap((id) => {
					console.log("🚀 ~ switchMap ~ id:", id)
					return todosService.deleteTodo(id).pipe(
						tapResponse({
							next: () => patchState(store, { query: { ...store.query() } }),
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
			store.getTodosByQuery(store.query)
		},
		onDestroy: (store) => console.log("Store destroyed", store)
	})
)
