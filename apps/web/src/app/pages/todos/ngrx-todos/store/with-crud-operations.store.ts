import { inject, Type } from "@angular/core"
import { tapResponse } from "@ngrx/operators"
import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { pipe, switchMap } from "rxjs"
import { CrudService } from "../services/crud.service"

export type BaseEntity = { id: string }

export type BaseState<TEntity> = {
	items: TEntity[]
	completed: boolean
}

export function WithCrudOperations<Entity extends BaseEntity>(
	dataServiceType: Type<CrudService<Entity>> // pass the service here
) {
	return signalStoreFeature(
		{
			state: type<BaseState<Entity>>()
		},
		withMethods((store, service = inject(dataServiceType)) => ({
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
			)
		}))
	)
}
