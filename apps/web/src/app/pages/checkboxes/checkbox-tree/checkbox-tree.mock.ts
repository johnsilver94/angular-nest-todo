import { Permission, PermissionCategory, PermissionSection, PermissionsTree } from "../../../models/permission.models"

export const permissionSectionListMock: PermissionSection[] = [
	{
		id: "1",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "underwriting",
		name: "Underwriting",
		description: "Underwriting permissions"
	},
	{
		id: "2",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "management",
		name: "Management",
		description: "Management permissions"
	},
	{
		id: "3",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "admin-area",
		name: "Admin area",
		description: "Administrative permissions"
	},
	{
		id: "4",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "section-for-another-module",
		name: "Section for another module",
		description: "Sed in mi feugiat, scelerisque elit ac, auctor sem. In tortor libero"
	}
]

export const permissionCategoryListMock: PermissionCategory[] = [
	{
		id: "1",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "underwriting-queue",
		name: "Underwriting queue",
		description: "Underwriting queue permissions"
	},
	{
		id: "2",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "case-view",
		name: "Case view",
		description: "Case view permissions"
	},
	{
		id: "3",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "manager-dashboard",
		name: "Manager dashboard",
		description: "Manager dashboard permissions"
	},
	{
		id: "4",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "user-groups",
		name: "User groups",
		description: "Manage permissions related to user groups"
	},
	{
		id: "8",
		parent_key: "4", // subcategory for User groups category
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "view-capabilities",
		name: "View capabilities",
		description: "Manage permissions related to viewing user groups"
	},
	{
		id: "9",
		parent_key: "4", // subcategory for User groups category
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "edit-capabilities",
		name: "Edit capabilities",
		description: "Manage permissions related to viewing user groups"
	},
	{
		id: "5",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "users",
		name: "Users",
		description: "Manage permissions related to users"
	},
	{
		id: "6",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "alpha-sample-category-for-another-module",
		name: "Alpha sample category for another module",
		description: "Etiam suscipit nisi eget lorem laoreet"
	},
	{
		id: "7",
		tenant_id: "1",
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
		category_key: "1",
		section_key: "1",
		name: "See all cases",
		description: "See all cases permission",
		deleted_at: null
	},
	{
		id: "2",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "1",
		section_key: "1",
		name: "Assign cases",
		description: "Assign cases permission",
		deleted_at: null
	},
	{
		id: "3",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "2",
		section_key: "1",
		name: "Manage risk & decision data",
		description: "Manage risk & decision data permission",
		deleted_at: null
	},
	{
		id: "4",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "2",
		section_key: "1",
		name: "Add comments",
		description: "Add comments permission",
		deleted_at: null
	},
	{
		id: "5",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "3",
		section_key: "2",
		name: "View reports",
		description: "View reports permission",
		deleted_at: null
	},
	{
		id: "6",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "3",
		section_key: "2",
		name: "View metrics",
		description: "View metrics permission",
		deleted_at: null
	},
	{
		id: "7",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "3",
		section_key: "2",
		name: "Change team assignments",
		description: "Change team assignments permission",
		deleted_at: null
	},
	{
		id: "8",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "8",
		section_key: "3",
		name: "View user groups in listing",
		description: "Allow users to be able to access the User Groups section and view the table with the defined User Groups",
		deleted_at: null
	},
	{
		id: "9",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "8",
		section_key: "3",
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
		category_key: "9",
		section_key: "3",
		name: "Edit group definition",
		description: "Allow users to edit the user group definition",
		deleted_at: null
	},
	{
		id: "11",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "9",
		section_key: "3",
		name: "Edit group permissions",
		description: "Allow users to edit the permissions of a user group",
		deleted_at: null
	},
	{
		id: "12",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "5",
		section_key: "3",
		name: "View user listing",
		description: "Allow users to access the Users section and view users list",
		deleted_at: null
	},
	{
		id: "13",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "5",
		section_key: "3",
		name: "View user details page",
		description: "Allow users to view the details page of an individual user",
		deleted_at: null
	},
	{
		id: "14",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "6",
		section_key: "4",
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
		category_key: "6",
		section_key: "4",
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
		category_key: "7",
		section_key: "4",
		name: "Beta 1",
		description: "Praesent auctor nisl at consequat sollicitudin",
		deleted_at: null
	},
	{
		id: "17",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		category_key: "7",
		section_key: "4",
		name: "Beta 2",
		description: "Aliquam non risus placerat",
		deleted_at: null
	},
	{
		id: "18",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		name: "Orphan 1",
		description: "Nullam sed sodales elit, non elementum quam. Fusce non metus.",
		deleted_at: null
	},
	{
		id: "19",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		name: "Orphan 2",
		description: "Proin sed molestie ante. Integer elementum erat et.",
		deleted_at: null
	},
	{
		id: "20",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		name: "Orphan 3",
		description: "Nam ut interdum metus. Sed.",
		deleted_at: null
	}
]

export const permissionsTree: PermissionsTree[] = [
	{
		id: "1",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "underwriting",
		name: "Underwriting",
		description: "Underwriting permissions",
		categories: [
			{
				id: "1",
				tenant_id: "1",
				created_at: "2024-01-01",
				updated_at: "2024-03-03",
				key: "underwriting-queue",
				name: "Underwriting queue",
				description: "Underwriting queue permissions",
				permissions: [
					{
						id: "1",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "1",
						section_key: "1",
						name: "See all cases",
						description: "See all cases permission",
						deleted_at: null
					},
					{
						id: "2",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "1",
						section_key: "1",
						name: "Assign cases",
						description: "Assign cases permission",
						deleted_at: null
					}
				]
			},
			{
				id: "2",
				tenant_id: "1",
				created_at: "2024-01-01",
				updated_at: "2024-03-03",
				key: "case-view",
				name: "Case view",
				description: "Case view permissions",
				permissions: [
					{
						id: "3",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "2",
						section_key: "1",
						name: "Manage risk & decision data",
						description: "Manage risk & decision data permission",
						deleted_at: null
					},
					{
						id: "4",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "2",
						section_key: "1",
						name: "Add comments",
						description: "Add comments permission",
						deleted_at: null
					}
				]
			}
		]
	},
	{
		id: "2",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "management",
		name: "Management",
		description: "Management permissions",
		categories: [
			{
				id: "3",
				tenant_id: "1",
				created_at: "2024-01-01",
				updated_at: "2024-03-03",
				key: "manager-dashboard",
				name: "Manager dashboard",
				description: "Manager dashboard permissions",
				permissions: [
					{
						id: "5",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "3",
						section_key: "2",
						name: "View reports",
						description: "View reports permission",
						deleted_at: null
					},
					{
						id: "6",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "3",
						section_key: "2",
						name: "View metrics",
						description: "View metrics permission",
						deleted_at: null
					},
					{
						id: "7",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "3",
						section_key: "2",
						name: "Change team assignments",
						description: "Change team assignments permission",
						deleted_at: null
					}
				]
			}
		]
	},
	{
		id: "3",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "admin-area",
		name: "Admin area",
		description: "Administrative permissions",
		categories: [
			{
				id: "4",
				tenant_id: "1",
				created_at: "2024-01-01",
				updated_at: "2024-03-03",
				key: "user-groups",
				name: "User groups",
				description: "Manage permissions related to user groups",
				subcategories: [
					{
						id: "8",
						parent_key: "4", // subcategory for User groups category
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						key: "view-capabilities",
						name: "View capabilities",
						description: "Manage permissions related to viewing user groups",
						permissions: [
							{
								id: "8",
								tenant_id: "1",
								created_at: "2024-01-01",
								updated_at: "2024-03-03",
								category_key: "8",
								section_key: "3",
								name: "View user groups in listing",
								description:
									"Allow users to be able to access the User Groups section and view the table with the defined User Groups",
								deleted_at: null
							},
							{
								id: "9",
								tenant_id: "1",
								created_at: "2024-01-01",
								updated_at: "2024-03-03",
								category_key: "8",
								section_key: "3",
								name: "View user groups in detail page",
								description:
									"Allow users to be able to access the User Groups details page for a user group and view the details of that User Groups",
								deleted_at: null
							}
						]
					},
					{
						id: "9",
						parent_key: "4", // subcategory for User groups category
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						key: "edit-capabilities",
						name: "Edit capabilities",
						description: "Manage permissions related to viewing user groups",
						permissions: [
							{
								id: "10",
								tenant_id: "1",
								created_at: "2024-01-01",
								updated_at: "2024-03-03",
								category_key: "9",
								section_key: "3",
								name: "Edit group definition",
								description: "Allow users to edit the user group definition",
								deleted_at: null
							},
							{
								id: "11",
								tenant_id: "1",
								created_at: "2024-01-01",
								updated_at: "2024-03-03",
								category_key: "9",
								section_key: "3",
								name: "Edit group permissions",
								description: "Allow users to edit the permissions of a user group",
								deleted_at: null
							}
						]
					}
				]
			},
			{
				id: "5",
				tenant_id: "1",
				created_at: "2024-01-01",
				updated_at: "2024-03-03",
				key: "users",
				name: "Users",
				description: "Manage permissions related to users",
				permissions: [
					{
						id: "12",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "5",
						section_key: "3",
						name: "View user listing",
						description: "Allow users to access the Users section and view users list",
						deleted_at: null
					},
					{
						id: "13",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "5",
						section_key: "3",
						name: "View user details page",
						description: "Allow users to view the details page of an individual user",
						deleted_at: null
					}
				]
			}
		]
	},
	{
		id: "4",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "section-for-another-module",
		name: "Section for another module",
		description: "Sed in mi feugiat, scelerisque elit ac, auctor sem. In tortor libero",
		categories: [
			{
				id: "6",
				tenant_id: "1",
				created_at: "2024-01-01",
				updated_at: "2024-03-03",
				key: "alpha-sample-category-for-another-module",
				name: "Alpha sample category for another module",
				description: "Etiam suscipit nisi eget lorem laoreet",
				permissions: [
					{
						id: "14",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "6",
						section_key: "4",
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
						category_key: "6",
						section_key: "4",
						name: "Alpha 2",
						description:
							"Mauris ipsum nulla, imperdiet elementum feugiat vel, molestie quis mauris. Nulla iaculis porttitor neque, eu molestie odio tincidunt non. Vestibulum et varius tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
						deleted_at: null
					}
				]
			},
			{
				id: "7",
				tenant_id: "1",
				created_at: "2024-01-01",
				updated_at: "2024-03-03",
				key: "beta-sample-category-for-another-module",
				name: "Beta sample category for another module",
				description: "Suspendisse ullamcorper ex in nibh egestas pulvinar",
				permissions: [
					{
						id: "16",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "7",
						section_key: "4",
						name: "Beta 1",
						description: "Praesent auctor nisl at consequat sollicitudin",
						deleted_at: null
					},
					{
						id: "17",
						tenant_id: "1",
						created_at: "2024-01-01",
						updated_at: "2024-03-03",
						category_key: "7",
						section_key: "4",
						name: "Beta 2",
						description: "Aliquam non risus placerat",
						deleted_at: null
					}
				]
			}
		]
	},
	{
		id: "4",
		tenant_id: "1",
		created_at: "2024-01-01",
		updated_at: "2024-03-03",
		key: "virtual-others-section",
		name: "Others",
		description: "Virtual section for orphane permissions.",
		permissions: [
			{
				id: "18",
				tenant_id: "1",
				created_at: "2024-01-01",
				updated_at: "2024-03-03",
				name: "Orphan 1",
				description: "Nullam sed sodales elit, non elementum quam. Fusce non metus.",
				deleted_at: null
			},
			{
				id: "19",
				tenant_id: "1",
				created_at: "2024-01-01",
				updated_at: "2024-03-03",
				name: "Orphan 2",
				description: "Proin sed molestie ante. Integer elementum erat et.",
				deleted_at: null
			},
			{
				id: "20",
				tenant_id: "1",
				created_at: "2024-01-01",
				updated_at: "2024-03-03",
				name: "Orphan 3",
				description: "Nam ut interdum metus. Sed.",
				deleted_at: null
			}
		]
	}
]
