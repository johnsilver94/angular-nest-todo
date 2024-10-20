// First node in tree.
type ParentNode<TData = unknown> = {
	data: TData
	type: "parent"
	childrens: TreeNode<TData>[]
}

// Intermediate node in tree.
type ChildNode<TData = unknown> = {
	data: TData
	type: "intermediate"
	childrens: TreeNode<TData>[]
}

// Last node in tree is a leaf node.
type LeafNode<TData = unknown> = {
	data: TData
	type: "leaf"
}

// Node used as list for orphan nodes
type VirtualNode<TData = unknown> = {
	data: TData
	type: "virtual"
	childrens: TreeNode<TData>[]
}

export type TreeNode<TData = unknown> = ParentNode<TData> | ChildNode<TData> | LeafNode<TData> | VirtualNode<TData>

export type CheckBoxData = {
	name: string
	completed: boolean
}

export type CheckBoxTreeNode = TreeNode<CheckBoxData>

export type Section = {
	name: string
	description: string
	tree: TreeNode[]
}
