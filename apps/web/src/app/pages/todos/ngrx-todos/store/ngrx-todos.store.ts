import { computed } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { entityConfig } from "@ngrx/signals/entities"
import { QueryOptions, SortDirection } from "../../../../models/pagination.model"
import { Todo } from "../../../../models/todo.model"
import { BaseEntity } from "../models/crud.model"
import { TodosService } from "../services/todos.service"
import { BaseState, withEntityPaginatedCrud } from "./features/entity-paginated-crud.feature"
import { withLogger } from "./features/logger.feature"
import { withSelectedEntity } from "./features/selected-entity.feature"

type TodosState = BaseState<QueryOptions>

type Another = BaseEntity & { another: string }

const initialState: TodosState = {
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
	withEntityPaginatedCrud<Todo, QueryOptions>(todoConfig, TodosService),
	withSelectedEntity<Todo, "todo">({ entity: todoConfig.entity, collection: todoConfig.collection }),
	withSelectedEntity<Another>(),

	withLogger(),
	withComputed(({ todoEntities }) => ({
		todosDatasource: computed(() => new MatTableDataSource(todoEntities()))
	})),
	withMethods((store) => ({
		updateQuery: (query: Partial<QueryOptions>) => {
			patchState(store, (state) => ({ query: { ...state.query, ...query } }))
		},
		getOne: (id: number) => {
			const todo = store["todoEntities"]().find((t) => t.id === id)
			if (todo) {
				store.todoEntitySelect(todo.id)
			} else {
				store.getOne({ id })
			}}
	})),
	withHooks({
		onInit(store) {
			console.log("Store initialized", store)
			store.getAllPaginated(store.query)
		},
		onDestroy: (store) => console.log("Store destroyed", store)
	})
)
