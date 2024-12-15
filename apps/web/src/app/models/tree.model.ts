// First node in tree.
type ParentNode<TData = unknown> = {
	data: TData
	type: "parent"
	children: TreeNode<TData>[]
}

// Intermediate node in tree.
type ChildNode<TData = unknown> = {
	data: TData
	type: "intermediate"
	children: TreeNode<TData>[]
}

// Last node in tree is a leaf node.
type LeafNode<TData = unknown> = {
	data: TData
	type: "leaf"
	children: TreeNode<TData>[]
}

// Node used as list for orphan nodes
type VirtualNode<TData = unknown> = {
	data: TData
	type: "virtual"
	children: TreeNode<TData>[]
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
	tree: CheckBoxTreeNode[]
}
