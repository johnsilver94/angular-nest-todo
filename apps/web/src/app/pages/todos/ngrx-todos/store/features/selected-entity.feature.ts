import { computed, Signal } from "@angular/core"
import {
	EmptyFeatureResult,
	patchState,
	SignalStoreFeature,
	signalStoreFeature,
	withComputed,
	withMethods,
	withState
} from "@ngrx/signals"
import { EntityId, EntityMap } from "@ngrx/signals/entities"
import { BaseEntity } from "../../models/crud.model"

export type SelectedEntityState = {
	entitySelectedId: EntityId | null
}

export type SelectedEntityProps<TEntity> = {
	entitySelected: Signal<TEntity | null>
}

export type SelectedEntityMethods = {
	entitySelect: (id: EntityId | null) => void
}

export type NamedSelectedEntityState<TCollection extends string> = {
	[K in keyof SelectedEntityState as `${TCollection}${Capitalize<K>}`]: SelectedEntityState[K]
}

export type NamedSelectedEntityProps<TEntity, TCollection extends string> = {
	[K in keyof SelectedEntityProps<TEntity> as `${TCollection}${Capitalize<K>}`]: SelectedEntityProps<TEntity>[K]
}

export type NamedSelectedEntityMethods<TCollection extends string> = {
	[K in keyof SelectedEntityMethods as `${TCollection}${Capitalize<K>}`]: SelectedEntityMethods[K]
}

export function getSelectedEntityStateKeys(config?: { collection?: string }): {
	selectedEntityIdKey: string
	selectEntityKey: string
	selectedEntityKey: string
} {
	const collection = config?.collection
	const selectedEntityIdKey = collection === undefined ? "entitySelectedId" : `${collection}EntitySelectedId`
	const selectEntityKey = collection === undefined ? "entitySelect" : `${collection}EntitySelect`
	const selectedEntityKey = collection === undefined ? "entitySelected" : `${collection}EntitySelected`

	return { selectedEntityIdKey, selectEntityKey, selectedEntityKey }
}

export function getEntityStateKeys(config?: { collection?: string }): {
	entityMapKey: string
	idsKey: string
	entitiesKey: string
} {
	const collection = config?.collection
	const entityMapKey = collection === undefined ? "entityMap" : `${collection}EntityMap`
	const idsKey = collection === undefined ? "ids" : `${collection}Ids`
	const entitiesKey = collection === undefined ? "entities" : `${collection}Entities`

	return { entityMapKey, idsKey, entitiesKey }
}

export function withSelectedEntity<TEntity extends BaseEntity>(): SignalStoreFeature<
	EmptyFeatureResult,
	{
		state: SelectedEntityState
		props: SelectedEntityProps<TEntity>
		methods: SelectedEntityMethods
	}
>
export function withSelectedEntity<TEntity extends BaseEntity>(config: {
	entity: TEntity
}): SignalStoreFeature<
	EmptyFeatureResult,
	{
		state: SelectedEntityState
		props: SelectedEntityProps<TEntity>
		methods: SelectedEntityMethods
	}
>
export function withSelectedEntity<TEntity extends BaseEntity, TCollection extends string>(config?: {
	entity: TEntity
	collection: TCollection
}): SignalStoreFeature<
	EmptyFeatureResult,
	{
		state: NamedSelectedEntityState<TCollection>
		props: NamedSelectedEntityProps<TEntity, TCollection>
		methods: NamedSelectedEntityMethods<TCollection>
	}
>
export function withSelectedEntity<TEntity extends BaseEntity, TCollection extends string>(config?: {
	entity: TEntity
	collection?: TCollection
}) {
	const { entityMapKey } = getEntityStateKeys(config)
	const { selectedEntityIdKey, selectEntityKey, selectedEntityKey } = getSelectedEntityStateKeys(config)

	return signalStoreFeature(
		withState({
			[selectedEntityIdKey]: null as EntityId | null
		}),
		withComputed((store: Record<string, Signal<unknown>>) => ({
			[selectedEntityKey]: computed(() => {
				const entityMap = store[entityMapKey] as Signal<EntityMap<TEntity>>
				const selectedId = store[selectedEntityIdKey]() as EntityId
				return selectedId ? entityMap()[selectedId] : null
			})
		})),
		withMethods((store) => ({
			[selectEntityKey]: (id: EntityId) => patchState(store, { [selectedEntityIdKey]: id })
		}))
	)
}
