import { patchState, signalStoreFeature, type, withComputed, withMethods } from "@ngrx/signals"
import { BaseEntity } from "./model"
import { CrudService } from "./crud.service"
import { computed, inject, Type } from "@angular/core"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { pipe, switchMap } from "rxjs"
import { tapResponse } from "@ngrx/operators"

export type BaseState<Entity> = {
	items: Entity[]
	completed: boolean
}

export function withCrudOperations<Entity extends BaseEntity>(
	dataServiceType: Type<CrudService<Entity>> // pass the service here
) {
	return signalStoreFeature(
		{
			state: type<BaseState<Entity>>()
		},
		withMethods((store) => {
			const service = inject(dataServiceType)

			return {
				addItem: rxMethod<Partial<Entity>>(
					pipe(
						switchMap((value) => {
							patchState(store, { completed: true })

							return service.addItem(value).pipe(
								tapResponse({
									next: (addedItem) => {
										patchState(store, {
											items: [...store.items(), addedItem]
										})
									},
									error: console.error,
									finalize: () => patchState(store, { completed: false })
								})
							)
						})
					)
				),

				async loadAllItemsByPromise() {
					patchState(store, { completed: true })
					const items = await service.getItemsAsPromise()
					patchState(store, { items, completed: false })
				},

				deleteItem: rxMethod<Entity>(
					pipe(
						switchMap((item) => {
							patchState(store, { completed: true })

							return service.deleteItem(item).pipe(
								tapResponse({
									next: () => {
										patchState(store, {
											items: [...store.items().filter((x) => x.id !== item.id)]
										})
									},
									error: console.error,
									finalize: () => patchState(store, { completed: false })
								})
							)
						})
					)
				),

				updateItem: rxMethod<Entity>(
					pipe(
						switchMap((item) => {
							patchState(store, { completed: true })

							return service.updateItem(item).pipe(
								tapResponse({
									next: (updatedItem) => {
										const allItems = [...store.items()]
										const index = allItems.findIndex((x) => x.id === item.id)

										allItems[index] = updatedItem

										patchState(store, {
											items: allItems
										})
									},
									error: console.error,
									finalize: () => patchState(store, { completed: false })
								})
							)
						})
					)
				)
			}
		}),
		withComputed(({ items }) => ({
			allItems: computed(() => items()),
			allItemsCount: computed(() => items().length)
			// Your selectors here
		}))
	)
}
