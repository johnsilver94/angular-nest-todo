import { inject, Type } from "@angular/core"
import { tapResponse } from "@ngrx/operators"
import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals"
import { addEntities, removeAllEntities, SelectEntityId, updateEntity, withEntities } from "@ngrx/signals/entities"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs"
import { BaseEntity, CreateOneEntity, UpdateOneEntity } from "../../models/crud.model"
import { BaseQuery } from "../../models/pagination.model"
import { CrudService } from "../../services/crud.service"
import { withRequestStatus } from "./request-status.feature"

export type BaseState<TQuery extends BaseQuery> = {
	pagination: {
		pageNumber: number
		pageSize: number
		pagesCount: number
		itemsCount: number
	}
	query: TQuery
	isLoading: boolean
}

export function withEntityPaginatedCrud<TEntity extends BaseEntity, TQuery extends BaseQuery>(
	entityConfig: {
		entity: TEntity
		collection: string
		selectId: SelectEntityId<NoInfer<TEntity>>
	},
	dataService: Type<CrudService<TEntity, TQuery>>
) {
	return signalStoreFeature(
		{
			state: type<BaseState<TQuery>>()
		},
		withEntities(entityConfig),
		withRequestStatus(),
		withMethods((store, service = inject(dataService)) => ({
			getAllPaginated: rxMethod<TQuery>(
				pipe(
					debounceTime(500),
					distinctUntilChanged(),
					tap(() => patchState(store, { isLoading: true })),
					switchMap((query) => {
						return service.getAllPaginated(query).pipe(
							tapResponse({
								next: ({ data, pagination }) => {
									patchState(store, removeAllEntities(entityConfig))
									patchState(store, addEntities(data, entityConfig))
									patchState(store, { pagination: pagination })
								},
								error: console.error,
								finalize: () => patchState(store, { isLoading: false })
							})
						)
					})
				)
			),
			addOne: rxMethod<CreateOneEntity<TEntity>>(
				pipe(
					tap(() => patchState(store, { isLoading: true })),
					switchMap((value) => {
						return service.addOne(value).pipe(
							tapResponse({
								next: () => patchState(store, { query: { ...store.query() } }),
								error: console.error,
								finalize: () => patchState(store, { isLoading: false })
							})
						)
					})
				)
			),
			updateOne: rxMethod<UpdateOneEntity<TEntity>>(
				pipe(
					tap(() => patchState(store, { isLoading: true })),
					switchMap((updateData) => {
						return service.updateOne(updateData).pipe(
							tapResponse({
								next: (updatedData) => {
									patchState(
										store,
										updateEntity(
											{
												id: updatedData.id,
												changes: updatedData
											},
											entityConfig
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
			deleteOne: rxMethod<Pick<TEntity, "id">>(
				pipe(
					tap(() => patchState(store, { isLoading: true })),
					switchMap((id) => {
						return service.deleteOne(id).pipe(
							tapResponse({
								next: () => patchState(store, { query: { ...store.query() } }),
								error: console.error,
								finalize: () => patchState(store, { isLoading: false })
							})
						)
					})
				)
			)
		}))
	)
}
