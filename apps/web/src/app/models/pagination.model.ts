export interface PaginationOptions {
	pageNumber: number
	pageSize: number
}

export enum SortDirection {
	ASC = "ASC",
	DESC = "DESC"
}

export interface SortingOptions {
	sortField: string
	sortDirection: SortDirection
}

export interface FilterOptions {
	filterField: string
	filterValue: string
}

export type QueryOptions = PaginationOptions & FilterOptions & SortingOptions

export interface Paginated<TData = unknown> {
	data: TData[]
	pagination: {
		pageNumber: number
		pageSize: number
		pagesCount: number
		itemsCount: number
	}
}

export interface LoadingState<TData = unknown> {
	loading: boolean
	error?: Error | null
	data?: TData
}
