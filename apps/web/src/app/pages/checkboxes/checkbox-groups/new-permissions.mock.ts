import { Section } from "./checkbox-groups.component"

type Base = {
	id: string
	tenant_id: string
	created_at: string
	updated_at: string
	deleted_at: string | null
}

export type Permission = Base & {
	module_key?: string
	category_key: string | null
	section_key: string | null
	name: string
	description: string
}

export type PermissionCategory = Base & {
	key: string
	parent_key: string | null // used for subcategories;
	section_key: string
	name: string
	description: string
}

export type PermissionSection = Base & {
	key: string
	name: string
	description: string
}

export const permissionSectionListMock: PermissionSection[] = [
	{
		id: "1",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		deleted_at: null,
		key: "underwriting",
		name: "Underwriting",
		description: "Underwriting permissions"
	},
	{
		id: "2",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		deleted_at: null,
		key: "management",
		name: "Management",
		description: "Management permissions"
	},
	{
		id: "3",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		deleted_at: null,
		key: "admin-area",
		name: "Admin area",
		description: "Administrative permissions"
	},
	{
		id: "4",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		deleted_at: null,
		key: "section-for-another-module",
		name: "Section for another module",
		description: "Sed in mi feugiat, scelerisque elit ac, auctor sem. In tortor libero"
	}
]

export const permissionCategoryListMock: PermissionCategory[] = [
	{
		id: "1",
		tenant_id: "1",
		section_key: "underwriting",
		parent_key: null,
		deleted_at: null,
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "underwriting-queue",
		name: "Underwriting queue",
		description: "Underwriting queue permissions"
	},
	{
		id: "2",
		tenant_id: "1",
		section_key: "underwriting",
		parent_key: null,
		deleted_at: null,
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "case-view",
		name: "Case view",
		description: "Case view permissions"
	},
	{
		id: "3",
		tenant_id: "1",
		section_key: "management",
		parent_key: null,
		deleted_at: null,
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "manager-dashboard",
		name: "Manager dashboard",
		description: "Manager dashboard permissions"
	},
	{
		id: "4",
		tenant_id: "1",
		section_key: "admin-area",
		parent_key: null,
		deleted_at: null,
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "user-groups",
		name: "User groups",
		description: "Manage permissions related to user groups"
	},
	{
		id: "8",
		tenant_id: "1",
		section_key: "admin-area",
		parent_key: "user-groups",
		deleted_at: null,
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "view-capabilities",
		name: "View capabilities",
		description: "Manage permissions related to viewing user groups"
	},
	{
		id: "9",
		tenant_id: "1",
		section_key: "admin-area",
		parent_key: "user-groups",
		deleted_at: null,
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "edit-capabilities",
		name: "Edit capabilities",
		description: "Manage permissions related to viewing user groups"
	},
	{
		id: "5",
		tenant_id: "1",
		section_key: "admin-area",
		parent_key: null,
		deleted_at: null,
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "users",
		name: "Users",
		description: "Manage permissions related to users"
	},
	{
		id: "6",
		tenant_id: "1",
		section_key: "section-for-another-module",
		parent_key: null,
		deleted_at: null,
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "alpha-sample-category-for-another-module",
		name: "Alpha sample category for another module",
		description: "Etiam suscipit nisi eget lorem laoreet"
	},
	{
		id: "7",
		tenant_id: "1",
		section_key: "section-for-another-module",
		parent_key: null,
		deleted_at: null,
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "beta-sample-category-for-another-module",
		name: "Beta sample category for another module",
		description: "Suspendisse ullamcorper ex in nibh egestas pulvinar"
	}
]

export const permissionListMock: Permission[] = [
	{
		id: "1",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "underwriting-queue",
		section_key: "underwriting",
		name: "See all cases",
		description: "See all cases permission",
		deleted_at: null
	},
	{
		id: "2",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "underwriting-queue",
		section_key: "underwriting",
		name: "Assign cases",
		description: "Assign cases permission",
		deleted_at: null
	},
	{
		id: "3",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "case-view",
		section_key: "underwriting",
		name: "Manage risk & decision data",
		description: "Manage risk & decision data permission",
		deleted_at: null
	},
	{
		id: "4",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "case-view",
		section_key: "underwriting",
		name: "Add comments",
		description: "Add comments permission",
		deleted_at: null
	},
	{
		id: "5",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "manager-dashboard",
		section_key: "management",
		name: "View reports",
		description: "View reports permission",
		deleted_at: null
	},
	{
		id: "6",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "manager-dashboard",
		section_key: "management",
		name: "View metrics",
		description: "View metrics permission",
		deleted_at: null
	},
	{
		id: "7",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "manager-dashboard",
		section_key: "management",
		name: "Change team assignments",
		description: "Change team assignments permission",
		deleted_at: null
	},
	{
		id: "8",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "view-capabilities",
		section_key: "admin-area",
		name: "View user groups in listing",
		description: "Allow users to be able to access the User Groups section and view the table with the defined User Groups",
		deleted_at: null
	},
	{
		id: "9",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "view-capabilities",
		section_key: "admin-area",
		name: "View user groups in detail page",
		description:
			"Allow users to be able to access the User Groups details page for a user group and view the details of that User Groups",
		deleted_at: null
	},
	{
		id: "10",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "edit-capabilities",
		section_key: "admin-area",
		name: "Edit group definition",
		description: "Allow users to edit the user group definition",
		deleted_at: null
	},
	{
		id: "11",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "edit-capabilities",
		section_key: "admin-area",
		name: "Edit group permissions",
		description: "Allow users to edit the permissions of a user group",
		deleted_at: null
	},
	{
		id: "12",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "users",
		section_key: "admin-area",
		name: "View user listing",
		description: "Allow users to access the Users section and view users list",
		deleted_at: null
	},
	{
		id: "13",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "users",
		section_key: "admin-area",
		name: "View user details page",
		description: "Allow users to view the details page of an individual user",
		deleted_at: null
	},
	{
		id: "14",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "alpha-sample-category-for-another-module",
		section_key: "section-for-another-module",
		name: "Alpha 1",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit augue, convallis ac dictum id, mollis ut libero. Integer molestie sagittis quam sit amet aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque interdum odio interdum suscipit pulvinar. Sed id tristique metus.",
		deleted_at: null
	},
	{
		id: "15",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "alpha-sample-category-for-another-module",
		section_key: "section-for-another-module",
		name: "Alpha 2",
		description:
			"Mauris ipsum nulla, imperdiet elementum feugiat vel, molestie quis mauris. Nulla iaculis porttitor neque, eu molestie odio tincidunt non. Vestibulum et varius tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
		deleted_at: null
	},
	{
		id: "16",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "beta-sample-category-for-another-module",
		section_key: "section-for-another-module",
		name: "Beta 1",
		description: "Praesent auctor nisl at consequat sollicitudin",
		deleted_at: null
	},
	{
		id: "17",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "beta-sample-category-for-another-module",
		section_key: "section-for-another-module",
		name: "Beta 2",
		description: "Aliquam non risus placerat",
		deleted_at: null
	},
	{
		id: "18",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: null,
		section_key: null,
		name: "Orphan 1",
		description: "Nullam sed sodales elit, non elementum quam. Fusce non metus.",
		deleted_at: null
	},
	{
		id: "19",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: null,
		section_key: null,
		name: "Orphan 2",
		description: "Proin sed molestie ante. Integer elementum erat et.",
		deleted_at: null
	},
	{
		id: "20",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: null,
		section_key: null,
		name: "Orphan 3",
		description: "Nam ut interdum metus. Sed.",
		deleted_at: null
	}
]

export const sections: Section[] = [
	{
		key: "underwriting",
		name: "Underwriting",
		description: "Underwriting permissions",
		tree: [
			{
				type: "parent",
				data: {
					key: "underwriting-queue",
					name: "Underwriting queue",
					description: "Underwriting queue permissions",
					permissionIds: ["1", "2"],
					checked: false,
					intermediate: false
				},
				children: [
					{
						type: "leaf",
						data: {
							key: "1",
							name: "See all cases",
							description: "See all cases permission",
							permissionId: "1",
							checked: false,
							intermediate: false
						},
						children: []
					},
					{
						type: "leaf",
						data: {
							key: "2",
							name: "Assign cases",
							description: "Assign cases permission",
							permissionId: "2",
							checked: false,
							intermediate: false
						},
						children: []
					}
				]
			},
			{
				type: "parent",
				data: {
					key: "case-view",
					name: "Case view",
					description: "Case view permissions",
					permissionIds: ["3", "4"],
					checked: false,
					intermediate: false
				},
				children: [
					{
						type: "leaf",
						data: {
							key: "3",
							name: "Manage risk & decision data",
							description: "Manage risk & decision data permission",
							permissionId: "3",
							checked: false,
							intermediate: false
						},
						children: []
					},
					{
						type: "leaf",
						data: {
							key: "4",
							name: "Add comments",
							description: "Add comments permission",
							permissionId: "4",
							checked: false,
							intermediate: false
						},
						children: []
					}
				]
			}
		]
	},
	{
		key: "management",
		name: "Management",
		description: "Management permissions",
		tree: [
			{
				type: "parent",
				data: {
					key: "manager-dashboard",
					name: "Manager dashboard",
					description: "Manager dashboard permissions",
					permissionIds: ["5", "6", "7"],
					checked: false,
					intermediate: false
				},
				children: [
					{
						type: "leaf",
						data: {
							key: "5",
							name: "View reports",
							description: "View reports permission",
							permissionId: "5",
							checked: false,
							intermediate: false
						},
						children: []
					},
					{
						type: "leaf",
						data: {
							key: "6",
							name: "View metrics",
							description: "View metrics permission",
							permissionId: "6",
							checked: false,
							intermediate: false
						},
						children: []
					},
					{
						type: "leaf",
						data: {
							key: "7",
							name: "Change team assignments",
							description: "Change team assignments permission",
							permissionId: "7",
							checked: false,
							intermediate: false
						},
						children: []
					}
				]
			}
		]
	},
	{
		key: "admin-area",
		name: "Admin area",
		description: "Administrative permissions",
		tree: [
			{
				type: "parent",
				data: {
					key: "user-groups",
					name: "User groups",
					description: "Manage permissions related to user groups",
					permissionIds: ["8", "9", "10", "11"],
					checked: false,
					intermediate: false
				},
				children: [
					{
						type: "intermediate", // subcategory for User groups category
						data: {
							key: "view-capabilities",
							name: "View capabilities",
							description: "Manage permissions related to viewing user groups",
							permissionIds: ["8", "9"],
							checked: false,
							intermediate: false
						},
						children: [
							{
								type: "leaf",
								data: {
									key: "8",
									name: "View user groups in listing",
									description:
										"Allow users to be able to access the User Groups section and view the table with the defined User Groups",
									permissionId: "8",
									checked: false,
									intermediate: false
								},
								children: []
							},
							{
								type: "leaf",
								data: {
									key: "9",
									name: "View user groups in detail page",
									description:
										"Allow users to be able to access the User Groups details page for a user group and view the details of that User Groups",
									permissionId: "9",
									checked: false,
									intermediate: false
								},
								children: []
							}
						]
					},
					{
						type: "intermediate", // subcategory for User groups category
						data: {
							key: "edit-capabilities",
							name: "Edit capabilities",
							description: "Manage permissions related to viewing user groups",
							permissionIds: ["10", "11"],
							checked: false,
							intermediate: false
						},
						children: [
							{
								type: "leaf",
								data: {
									key: "10",
									name: "Edit group definition",
									description: "Allow users to edit the user group definition",
									permissionId: "10",
									checked: false,
									intermediate: false
								},
								children: []
							},
							{
								type: "leaf",
								data: {
									key: "11",
									name: "Edit group permissions",
									description: "Allow users to edit the permissions of a user group",
									permissionId: "11",
									checked: false,
									intermediate: false
								},
								children: []
							}
						]
					}
				]
			},
			{
				type: "parent",
				data: {
					key: "users",
					name: "Users",
					description: "Manage permissions related to users",
					permissionIds: ["12", "13"],
					checked: false,
					intermediate: false
				},
				children: [
					{
						type: "leaf",
						data: {
							key: "12",
							name: "View user listing",
							description: "Allow users to access the Users section and view users list",
							permissionId: "12",
							checked: false,
							intermediate: false
						},
						children: []
					},
					{
						type: "leaf",
						data: {
							key: "13",
							name: "View user details page",
							description: "Allow users to view the details page of an individual user",
							permissionId: "13",
							checked: false,
							intermediate: false
						},
						children: []
					}
				]
			}
		]
	},
	{
		key: "section-for-another-module",
		name: "Section for another module",
		description: "Sed in mi feugiat, scelerisque elit ac, auctor sem. In tortor libero",
		tree: [
			{
				type: "parent",
				data: {
					key: "alpha-sample-category-for-another-module",
					name: "Alpha sample category for another module",
					description: "Etiam suscipit nisi eget lorem laoreet",
					permissionIds: ["14", "15"],
					checked: false,
					intermediate: false
				},
				children: [
					{
						type: "leaf",
						data: {
							key: "14",
							name: "Alpha 1",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit augue, convallis ac dictum id, mollis ut libero. Integer molestie sagittis quam sit amet aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque interdum odio interdum suscipit pulvinar. Sed id tristique metus.",
							permissionId: "14",
							checked: false,
							intermediate: false
						},
						children: []
					},
					{
						type: "leaf",
						data: {
							key: "15",
							name: "Alpha 2",
							permissionId: "14",
							description:
								"Mauris ipsum nulla, imperdiet elementum feugiat vel, molestie quis mauris. Nulla iaculis porttitor neque, eu molestie odio tincidunt non. Vestibulum et varius tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
							checked: false,
							intermediate: false
						},
						children: []
					}
				]
			},
			{
				type: "parent",
				data: {
					key: "beta-sample-category-for-another-module",
					name: "Beta sample category for another module",
					description: "Suspendisse ullamcorper ex in nibh egestas pulvinar",
					permissionIds: ["16", "17"],
					checked: false,
					intermediate: false
				},
				children: [
					{
						type: "leaf",
						data: {
							key: "16",
							name: "Beta 1",
							description: "Praesent auctor nisl at consequat sollicitudin",
							permissionId: "16",
							checked: false,
							intermediate: false
						},
						children: []
					},
					{
						type: "leaf",
						data: {
							key: "17",
							name: "Beta 2",
							description: "Aliquam non risus placerat",
							permissionId: "17",
							checked: false,
							intermediate: false
						},
						children: []
					}
				]
			}
		]
	},
	{
		key: "virtual-others-section",
		name: "Others",
		description: "Virtual section for orphane permissions.",
		tree: [
			{
				type: "virtual",
				data: {
					key: "virtual-node",
					name: "Virtual node",
					description: "Virtual node",
					permissionIds: ["18", "19", "20"],
					checked: false,
					intermediate: false
				},
				children: [
					{
						type: "leaf",
						data: {
							key: "18",
							name: "Orphan 1",
							description: "Nullam sed sodales elit, non elementum quam. Fusce non metus.",
							permissionId: "18",
							checked: false,
							intermediate: false
						},
						children: []
					},
					{
						type: "leaf",
						data: {
							key: "19",
							name: "Orphan 2",
							description: "Proin sed molestie ante. Integer elementum erat et.",
							permissionId: "19",
							checked: false,
							intermediate: false
						},
						children: []
					},
					{
						type: "leaf",
						data: {
							key: "20",
							name: "Orphan 3",
							description: "Nam ut interdum metus. Sed.",
							permissionId: "20",
							checked: false,
							intermediate: false
						},
						children: []
					}
				]
			}
		]
	}
]
