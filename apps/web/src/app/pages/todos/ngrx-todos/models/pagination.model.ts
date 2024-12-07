export type PaginationOptions = {
	pageNumber: number
	pageSize: number
}

export enum SortDirection {
	ASC = "ASC",
	DESC = "DESC"
}

export type SortingOptions = {
	sortField: string
	sortDirection: SortDirection
}

export type FilterOptions = {
	filterField: string
	filterValue: string
}

export type BaseQuery = PaginationOptions

export type QueryOptions = PaginationOptions & FilterOptions & SortingOptions

export type Pagination = {
	pageNumber: number
	pageSize: number
	pagesCount: number
	itemsCount: number
}

export type Paginated<TData = unknown> = {
	data: TData[]
	pagination: Pagination
}
