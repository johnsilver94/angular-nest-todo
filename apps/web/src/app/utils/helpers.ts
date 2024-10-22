import type { TreeNode } from "./types"

export type ArrayToTreeProps<T> = {
	rawData: T[]
	options: {
		defaultLevel: number
		idField: keyof T
		titleField: keyof T
		linkField: keyof T
		collectFields?: (keyof T)[]
	}
}

export const arrayToTree = <T extends object>({
	rawData,
	options: { defaultLevel, linkField, idField, titleField }
}: ArrayToTreeProps<T>): TreeNode<T>[] | [] => {
	const hashMap = new Map<string, TreeNode<T>>()
	const stackList: TreeNode<T>[] = []

	rawData.forEach((data) => {
		hashMap.set(String(data[idField]), {
			self: { id: String(data[idField]), title: String(data[titleField]), original: data, level: defaultLevel },
			childNodes: []
		})
	})

	rawData.forEach((data) => {
		if (data[linkField]) {
			const child = hashMap.get(String(data[idField]))

			if (child) {
				child.self.level++
				hashMap.get(String(data[linkField]))?.childNodes?.push(child)
			}
		} else {
			const parent = hashMap.get(String(data[idField]))

			if (parent) stackList.push(parent)
		}
	})

	return stackList
}

export const treeToArray = <T extends object>(tree: TreeNode<T>[]): T[] => {
	const flatten = (tree: TreeNode<T>[]): T[] =>
		tree.flatMap((node): T[] => {
			const { childNodes, self } = node

			return [self.original, ...flatten(childNodes || [])]
		})

	return flatten(tree)
}
