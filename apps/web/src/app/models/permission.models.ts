type Base = {
	id: string
	tenant_id: string
	created_at: string
	updated_at: string
}

export type Permission = Base & {
	type?: string // permission details for opa
	resource?: string // permission details for opa
	action?: string // permission details for opa
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	condition?: any // permission details for opa
	module_key?: string
	category_key?: string
	section_key?: string
	name: string
	description: string
	deleted_at: string | null
}

export type PermissionCategory = Base & {
	key: string
	parent_key?: string // used for subcategories;
	section_key?: string // added value; experimental;
	name: string
	description: string
}

export type PermissionSection = Base & {
	key: string
	name: string
	description: string
}

export type PermissionTreeCategory = PermissionCategory & {
	permissions?: Permission[]
	subcategories?: (PermissionCategory & { permissions?: Permission[] })[]
}

export type PermissionsTree = PermissionSection & {
	categories?: PermissionTreeCategory[]
	permissions?: Permission[]
}
