import { Permission, PermissionCategory } from "../../../models/permission.models"
import { CheckBoxTreeNode, Section } from "../../../models/tree.model"
import { arrayToTree } from "../../../utils/helpers"
import { permissionCategoryListMock, permissionListMock, permissionSectionListMock } from "./permissions.mock"

type PermissionCategoryNode = {
	id: string
	parent_id?: string
	type: "category" | "permission"
	key: string
	section_key?: string
	name: string
	description: string
}

export const arrayToTreeTest = () => {
	console.group("arrayToTreeTest Example")
	console.time("arrayToTree time")
	const categories: PermissionCategoryNode[] = permissionCategoryListMock.map(
		({ id, parent_key, key, section_key, name, description }) => ({
			id: `c-${id}`,
			parent_id: parent_key ? `c-${parent_key}` : undefined,
			type: "category",
			key,
			section_key,
			name,
			description
		})
	)

	const permissions: PermissionCategoryNode[] = permissionListMock.map(
		({ id, category_key, section_key, name, description }) => ({
			id: `p-${id}`,
			parent_id: category_key ? `c-${category_key}` : undefined,
			type: "permission",
			key: `permission-${id}`,
			section_key,
			name,
			description
		})
	)

	const permissionCategoryList: PermissionCategoryNode[] = [...categories, ...permissions]

	const trees = arrayToTree<PermissionCategoryNode>({
		rawData: permissionCategoryList.filter(
			({ section_key, parent_id }) => section_key !== undefined || parent_id !== undefined
		),
		options: {
			defaultLevel: 1,
			idField: "id",
			titleField: "name",
			linkField: "parent_id"
		}
	})

	// console.table(permissionCategoryList)

	trees.forEach((tree) => {
		console.log("🚀 ~ trees.forEach ~ tree:", tree)
	})

	const sections = permissionSectionListMock.map(({ id, name, description }) => {
		return {
			name,
			description,
			trees: trees.filter((tree) => tree.self.original.section_key === id)
		}
	})

	sections.push({
		name: "Others",
		description: "Virtual section for orphane permissions.",
		trees: permissionCategoryList
			.filter(
				({ type, section_key, parent_id }) => type === "permission" && section_key === undefined && parent_id === undefined
			)
			.map((item) => ({
				self: {
					id: item.id,
					title: item.name,
					level: 1,
					original: item
				}
			}))
	})

	console.table(sections)
	console.log(sections)

	console.timeEnd("arrayToTree time")
	console.groupEnd()
}

export const getSections = () => {
	console.group("getSections Example")
	const checkedPermissions: string[] = ["1", "2", "5", "8"]
	console.time("getSections time")
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
				data: { name, completed: checkedPermissions.includes(id) }
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
		const itermediate_ids = permissionCategoryListMock
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

	const sections: Section[] = permissionSectionListMock.map((section) => {
		const section_permissions = permissionListMock.filter((permission) => permission.section_key === section.id)

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
				permissionCategoryListMock.filter(({ id }) => section_category_ids.includes(id)),
				permissionCategoryListMock.filter(({ id, parent_key }) => section_category_ids.includes(id) && !parent_key),
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
				childrens: permissionListMock
					.filter(({ section_key, category_key }) => !section_key && !category_key)
					.map(({ id, name }) => ({
						type: "leaf",
						data: { name, completed: checkedPermissions.includes(id) }
					}))
			}
		]
	})

	// console.table(sections)
	console.timeEnd("getSections time")
	console.groupEnd()
}
