import { patchState, signalStore, type, withComputed, withHooks, withMethods } from "@ngrx/signals"
import { addEntities, withEntities } from "@ngrx/signals/entities"
import { Permission, PermissionCategory, PermissionSection, PermissionsTree } from "../../models/permission.models"
import { computed } from "@angular/core"
import {
	permissionCategoryListMock,
	permissionListMock,
	permissionSectionListMock,
	permissionsTree
} from "./permissions.mock"

export const PermissionsStore = signalStore(
	// withState(initialState),
	withEntities({ entity: type<Permission>(), collection: "permission" }),
	withEntities({ entity: type<PermissionSection>(), collection: "section" }),
	withEntities({ entity: type<PermissionCategory>(), collection: "category" }),
	withComputed(() => ({
		getPermissionsTree: computed<PermissionsTree[]>(() => permissionsTree)
	})),
	withMethods((store) => ({
		getPermissions(): void {
			patchState(store, addEntities(permissionListMock, { collection: "permission" }))
		},
		getPermissionSections(): void {
			patchState(store, addEntities(permissionSectionListMock, { collection: "section" }))
		},
		getPermissionCategories(): void {
			patchState(store, addEntities(permissionCategoryListMock, { collection: "category" }))
		}
	})),
	withHooks({
		onInit: ({ getPermissions, getPermissionSections, getPermissionCategories }) => {
			getPermissions()
			getPermissionSections()
			getPermissionCategories()
		}
	})
)
