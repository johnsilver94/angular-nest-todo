import { Transform } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator"

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

export type QueryOptionsQuery = PaginationOptions & SortingOptions & FilterOptions

export enum SortDirection {
	ASC = "asc",
	DESC = "desc"
}

export interface PaginationResponse<T> {
	data: T[]
	pagination: {
		pageNumber: number
		pageSize: number
		pagesCount: number
		itemsCount: number
	}
}

export class QueryOptionsDto implements PaginationOptions, SortingOptions, FilterOptions {
	@IsNumber()
	@IsNotEmpty()
	@Transform(({ value }) => Number(value))
	@Min(1)
	pageNumber = 1
	@IsNumber()
	@IsNotEmpty()
	@Transform(({ value }) => Number(value))
	@Min(1)
	pageSize = 10
	@IsOptional()
	@IsString()
	@MinLength(0)
	sortField = ""
	@IsOptional()
	@IsString()
	@IsEnum(SortDirection)
	sortDirection: SortDirection = SortDirection.ASC
	@IsOptional()
	@IsString()
	@MinLength(0)
	filterField = ""
	@IsOptional()
	@IsString()
	@MinLength(0)
	filterValue = ""
}
