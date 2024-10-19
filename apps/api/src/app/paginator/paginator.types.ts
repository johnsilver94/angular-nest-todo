export interface PaginationOptions {
	pageNumber: number
	pageSize: number
}

export interface SortingOptions {
	sortField: string
	sortDirection: SortDirection
}

export interface FilterOptions {
	filterField: string
	filterValue: string
}

export type PaginationQuery = PaginationOptions & SortingOptions & FilterOptions

export enum SortDirection {
	ASC = "ASC",
	DESC = "DESC"
}

export interface Paginated<TData = unknown> {
	data: TData[]
	pagination: {
		pageNumber: number
		pageSize: number
		pagesCount: number
		itemsCount: number
	}
}
