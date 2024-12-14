import { computed } from "@angular/core"
import { tapResponse } from "@ngrx/operators"
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { addEntities, withEntities } from "@ngrx/signals/entities"
import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { delay, of, pipe, switchMap, tap } from "rxjs"
import { Permission, PermissionCategory, PermissionSection } from "../../../models/permission.models"
import { CheckBoxTreeNode, Section } from "../../../models/tree.model"
import { permissionCategoryListMock, permissionListMock, permissionSectionListMock } from "./permissions.mock"

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
	withComputed(({ sectionEntities, categoryEntities, permissionEntities, permissions: checkedPermissions }) => ({
		getSections: computed<Section[]>(() => {
			console.log("🚀 ~ withComputed ~ checkedPermissions:", checkedPermissions())
			const buildCategoriesTree = (
				// section permissions
				permissions: Permission[],
				// section categories
				categories: PermissionCategory[],
				// should exist at least one parent category
				parentCategories: PermissionCategory[],
				firstLevel = false
			): CheckBoxTreeNode[] => {
				return parentCategories.map((category) => {
					const category_permissions = permissions.filter((permission) => permission.category_key === category.id)
					const subcategories = categories.filter((cat) => cat.parent_key === category.id)

					let subcategories_tree: CheckBoxTreeNode[] = []
					if (subcategories.length) {
						subcategories_tree = buildCategoriesTree(permissions, categories, subcategories)
					}

					const leaf_children: CheckBoxTreeNode[] = category_permissions.map(({ name, id }) => ({
						type: "leaf",
						data: { name, completed: checkedPermissions().includes(id) },
						children: []
					}))

					const children = [...subcategories_tree, ...leaf_children]

					return {
						type: firstLevel ? "parent" : "intermediate",
						data: { name: category.name, completed: children.every((child) => child.data.completed) },
						children
					}
				})
			}

			const getSectionCategoriesIds = (ids: string[]): string[] => {
				let res_ids: string[] = []
				const intermediate_ids = categoryEntities()
					.filter(({ id }) => ids.includes(id))
					.map(({ parent_key }) => parent_key)
					.filter((cat) => cat !== undefined)

				if (intermediate_ids.length) {
					const parent_ids = getSectionCategoriesIds(intermediate_ids)
					if (parent_ids.length) {
						res_ids = [...parent_ids, ...intermediate_ids]
					}
					res_ids = [...intermediate_ids]
				}

				return [...new Set(res_ids)]
			}

			const sections: Section[] = sectionEntities().map((section) => {
				const section_permissions = permissionEntities().filter((permission) => permission.section_key === section.id)

				// get permissions categories ids, all categories with permissions, last level of tree
				const leaf_category_ids: string[] = [
					...new Set(section_permissions.map((permission) => permission.category_key))
				].filter((val) => val !== undefined)

				// get recursively all categories ids
				const section_category_ids: string[] = [...getSectionCategoriesIds(leaf_category_ids), ...leaf_category_ids]

				return {
					name: section.name,
					description: section.description,
					tree: buildCategoriesTree(
						section_permissions,
						categoryEntities().filter(({ id }) => section_category_ids.includes(id)),
						categoryEntities().filter(({ id, parent_key }) => section_category_ids.includes(id) && !parent_key),
						true
					)
				}
			})

			// add orphan permissions to "Others" section
			sections.push({
				name: "Others",
				description: "Virtual section for orphan permissions.",
				tree: [
					{
						type: "virtual",
						data: { name: "Virtual node", completed: false },
						children: permissionEntities()
							.filter((permission) => !permission.section_key && !permission.category_key)
							.map(({ id, name }) => ({
								type: "leaf",
								data: { name, completed: checkedPermissions().includes(id) },
								children: []
							}))
					}
				]
			})

			return sections
		})
	})),
	withMethods((store) => ({
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
