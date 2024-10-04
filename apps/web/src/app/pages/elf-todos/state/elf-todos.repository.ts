import { Injectable } from "@angular/core"
import { switchMap } from "rxjs/operators"
import { select, withProps, createStore, setProp } from "@ngneat/elf"
import { addEntities, selectAllEntities, selectAllEntitiesApply, updateEntities, withEntities } from "@ngneat/elf-entities"

interface Todo {
	id: number
	title: string
	completed: boolean
}

export interface TodosProps {
	filter: "ALL" | "ACTIVE" | "COMPLETED"
}

const store = createStore({ name: "todos" }, withProps<TodosProps>({ filter: "ALL" }), withEntities<Todo>())

@Injectable({ providedIn: "root" })
export class ElfTodosRepository {
	todos$ = store.pipe(selectAllEntities())
	filter$ = store.pipe(select((state) => state.filter))

	visibleTodos$ = this.filter$.pipe(
		switchMap((filter) => {
			return store.pipe(
				selectAllEntitiesApply({
					filterEntity({ completed }) {
						if (filter === "ALL") return true
						return filter === "COMPLETED" ? completed : !completed
					}
				})
			)
		})
	)

	addTodo(title: Todo["title"]) {
		store.update(addEntities({ id: Math.random(), title, completed: false }))
	}

	updateFilter(filter: TodosProps["filter"]) {
		store.update(setProp("filter", filter))
	}

	updateCompleted(id: Todo["id"]) {
		store.update(
			updateEntities(id, (entity) => ({
				...entity,
				completed: !entity.completed
			}))
		)
	}
}
