import { signalStore, signalStoreFeature, type, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { BaseState, withCrudOperations } from "./crud.state"
import { Todo } from "./model"
import { TodoService } from "./todo.service"
import { computed } from "@angular/core"

export type TodoState = BaseState<Todo>

export const initialState: TodoState = {
	items: [],
	completed: false
}

export function withTodoSelectors() {
	return signalStoreFeature(
		{
			state: type<TodoState>()
		},
		withComputed(({ items }) => ({
			doneCount: computed(() => items().filter((x) => x.completed).length),
			undoneCount: computed(() => items().filter((x) => !x.completed).length),
			percentageDone: computed(() => {
				const completed = items().filter((x) => x.completed).length
				const total = items().length

				if (total === 0) {
					return 0
				}

				return (completed / total) * 100
			})
		}))
	)
}

export const TodoStore = signalStore(
	{ providedIn: "root" },
	withState(initialState),
	withCrudOperations<Todo>(TodoService),
	withTodoSelectors(),
	withMethods((store) => ({
		moveToDone(item: Todo) {
			store.updateItem({ ...item, completed: true })
		}
	})),
	withHooks({
		onInit({ loadAllItemsByPromise }) {
			console.log("on init")
			loadAllItemsByPromise()
		},
		onDestroy() {
			console.log("on destroy")
		}
	})
)
