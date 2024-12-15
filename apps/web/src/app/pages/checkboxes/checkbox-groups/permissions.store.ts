import { tapResponse } from "@ngrx/operators"
import { patchState, signalStore, type, withHooks, withMethods, withState } from "@ngrx/signals"
import { addEntities, withEntities } from "@ngrx/signals/entities"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { delay, of, pipe, switchMap, tap } from "rxjs"
import {
	Permission,
	PermissionCategory,
	permissionCategoryListMock,
	permissionListMock,
	PermissionSection,
	permissionSectionListMock
} from "./new-permissions.mock"

type PermissionsState = {
	permissions: string[]
	isLoading: boolean
}

const initialState: PermissionsState = {
	permissions: ["1", "2", "5", "8"],
	isLoading: false
}

export const PermissionsStore = signalStore(
	withState(initialState),
	withEntities({ entity: type<Permission>(), collection: "permission" }),
	withEntities({ entity: type<PermissionSection>(), collection: "section" }),
	withEntities({ entity: type<PermissionCategory>(), collection: "category" }),
	withMethods((store) => ({
		resetPermissions: () => {
			console.log("🚀 ~ resetPermissions", [...store.permissions()])
			patchState(store, { permissions: [...store.permissions()] })
		},
		updatePermissions: rxMethod<string[]>(
			pipe(
				tap(() => patchState(store, { isLoading: true })),
				delay(1000),
				switchMap((ids) => {
					console.log("🚀 ~ switchMap ~ ids:", ids)
					return of(ids).pipe(
						tapResponse({
							next: (data) => patchState(store, { permissions: data }),
							error: console.error,
							finalize: () => patchState(store, { isLoading: false })
						})
					)
				})
			)
		)
	})),
	withHooks({
		onInit: (store) => {
			console.log("🚀 ~ onInit hook")

			patchState(store, addEntities(permissionListMock, { collection: "permission" }))
			patchState(store, addEntities(permissionSectionListMock, { collection: "section" }))
			patchState(store, addEntities(permissionCategoryListMock, { collection: "category" }))
		},
		onDestroy: () => {
			console.log("🚀 ~ onDestroy hook")
		}
	})
)
