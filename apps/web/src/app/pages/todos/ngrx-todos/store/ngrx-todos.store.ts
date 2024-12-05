import { computed } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { entityConfig } from "@ngrx/signals/entities"
import { QueryOptions, SortDirection } from "../../../../models/pagination.model"
import { Todo } from "../../../../models/todo.model"
import { TodosService } from "../services/todos.service"
import { BaseState, WithPaginatedCrudOperations } from "./with-crud-operations.store"

type TodosState = BaseState<QueryOptions>

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
	WithPaginatedCrudOperations<Todo, QueryOptions>(todoConfig, TodosService),
	withComputed(({ todoEntities }) => ({
		todosDatasource: computed(() => new MatTableDataSource(todoEntities()))
	})),
	withMethods((store) => ({
		updateQuery: (query: Partial<QueryOptions>) => {
			patchState(store, (state) => ({ query: { ...state.query, ...query } }))
		}
	})),
	withHooks({
		onInit(store) {
			console.log("Store initialized", store)
			store.getAllPaginated(store.query)
		},
		onDestroy: (store) => console.log("Store destroyed", store)
	})
)
