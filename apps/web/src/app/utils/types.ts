export type NodeData<T> = {
	id: string
	title: string
	level: number
	original: T
}

export type TreeNode<T> = {
	self: NodeData<T>
	childNodes?: TreeNode<T>[]
}
