import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from "@ngrx/signals"
import { addEntities, withEntities } from "@ngrx/signals/entities"
import { Permission, PermissionCategory, PermissionSection } from "../../models/permission.models"
import { computed } from "@angular/core"
import { permissionCategoryListMock, permissionListMock, permissionSectionListMock } from "./permissions.mock"
import { CheckBoxTreeNode, Section } from "../../models/tree.model"

type PermissionsState = {
	checkedPermissions: string[]
}

const initialState: PermissionsState = {
	checkedPermissions: ["1", "2", "5", "8"]
}

export const PermissionsStore = signalStore(
	withState(initialState),
	withEntities({ entity: type<Permission>(), collection: "permission" }),
	withEntities({ entity: type<PermissionSection>(), collection: "section" }),
	withEntities({ entity: type<PermissionCategory>(), collection: "category" }),
	withComputed(({ sectionEntities, categoryEntities, permissionEntities, checkedPermissions }) => ({
		getSections: computed<Section[]>(() => {
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

					const leaf_childrens: CheckBoxTreeNode[] = category_permissions.map(({ name, id }) => ({
						type: "leaf",
						data: { name, completed: checkedPermissions().includes(id) }
					}))

					const childrens = [...subcategories_tree, ...leaf_childrens]

					return {
						type: firstLevel ? "parent" : "intermediate",
						data: { name: category.name, completed: childrens.every((child) => child.data.completed) },
						childrens
					}
				})
			}

			const getSectionCategoriesIds = (ids: string[]): string[] => {
				let res_ids: string[] = []
				const itermediate_ids = categoryEntities()
					.filter(({ id }) => ids.includes(id))
					.map(({ parent_key }) => parent_key)
					.filter((cat) => cat !== undefined)

				if (itermediate_ids.length) {
					const parent_ids = getSectionCategoriesIds(itermediate_ids)
					if (parent_ids.length) {
						res_ids = [...parent_ids, ...itermediate_ids]
					}
					res_ids = [...itermediate_ids]
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

			// add orphane permissions to "Others" section
			sections.push({
				name: "Others",
				description: "Virtual section for orphane permissions.",
				tree: [
					{
						type: "virtual",
						data: { name: "Virtual node", completed: false },
						childrens: permissionEntities()
							.filter((permission) => !permission.section_key && !permission.category_key)
							.map(({ id, name }) => ({
								type: "leaf",
								data: { name, completed: checkedPermissions().includes(id) }
							}))
					}
				]
			})

			return sections
		})
	})),
	withMethods((store) => ({
		updateCheckedPermissions(checkedPermissions: string[]): void {
			patchState(store, { checkedPermissions })
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
