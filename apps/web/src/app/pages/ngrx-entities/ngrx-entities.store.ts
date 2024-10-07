import { computed } from "@angular/core"
import { patchState, signalStore, type, withComputed, withMethods } from "@ngrx/signals"
import {
	addEntities,
	addEntity,
	entityConfig,
	removeEntity,
	updateEntity,
	updateAllEntities,
	withEntities
} from "@ngrx/signals/entities"

export type Todo = {
	key: number
	text: string
	completed: boolean
}

const todoConfig = entityConfig({
	entity: type<Todo>(),
	collection: "todo",
	selectId: (todo) => todo.key
})

export const NGRXEntitiesTodoStore = signalStore(
	withEntities(todoConfig),
	withComputed(({ todoEntities }) => ({
		allItemsCount: computed(() => todoEntities().length),
		doneCount: computed(() => todoEntities().filter((x) => x.completed).length),
		undoneCount: computed(() => todoEntities().filter((x) => !x.completed).length),
		percentageDone: computed(() => {
			const completed = todoEntities().filter((x) => x.completed).length
			const total = todoEntities().length

			if (total === 0) {
				return 0
			}

			return (completed / total) * 100
		})
	})),
	withMethods((store) => ({
		addTodos(todos: Todo[]): void {
			patchState(store, addEntities(todos, todoConfig))
		},
		addTodo(todo: Todo): void {
			patchState(store, addEntity(todo, todoConfig))
		},
		updateTodo({ key, ...rest }: Todo): void {
			patchState(store, updateEntity({ id: key, changes: (todo) => ({ ...todo, ...rest }) }, todoConfig))
		},
		completeAllTodos(): void {
			patchState(store, updateAllEntities({ completed: true }, todoConfig))
		},
		removeTodo(key: number): void {
			patchState(store, removeEntity(key, todoConfig))
		}
	}))
)
