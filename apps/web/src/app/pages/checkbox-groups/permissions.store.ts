import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { addEntities, withEntities } from "@ngrx/signals/entities"
import { Permission, PermissionCategory, PermissionSection, PermissionsTree } from "../../models/permission.models"
import { computed } from "@angular/core"
import {
	permissionCategoryListMock,
	permissionListMock,
	permissionSectionListMock,
	permissionsTree
} from "./permissions.mock"

export interface Task {
	name: string
	completed: boolean
	subtasks?: Task[]
}

type StoreState = {
	task: Task
}

const initialState: StoreState = {
	task: {
		name: "Parent task",
		completed: false,
		subtasks: [
			{ name: "Child task 1", completed: true },
			{ name: "Child task 2", completed: false },
			{ name: "Child task 3", completed: false }
		]
	}
}

export const PermissionsStore = signalStore(
	withState(initialState),
	withEntities({ entity: type<Permission>(), collection: "permission" }),
	withEntities({ entity: type<PermissionSection>(), collection: "section" }),
	withEntities({ entity: type<PermissionCategory>(), collection: "category" }),
	withComputed(() => ({
		getPermissionsTree: computed<PermissionsTree[]>(() => permissionsTree)
	})),
	withMethods((store) => ({
		updateTask: (completed: boolean, index?: number) => {
			if (index === undefined) {
				return patchState(store, ({ task }) => ({
					task: { ...task, completed, subtasks: task.subtasks?.forEach((t) => (t.completed = completed)) || [] }
				}))
			} else {
				patchState(store, ({ task }) => ({
					task: {
						...task,
						completed
						// subtasks: task.subtasks?.map((t, i) => (i === index ? { ...t, completed } : t)) || []
					}
				}))
			}
		},
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
