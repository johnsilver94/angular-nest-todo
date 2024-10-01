import { Transform } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator"
import { FilterOptions, PaginationOptions, SortDirection, SortingOptions } from "../paginator.types"

export class PaginationQueryDto implements PaginationOptions, SortingOptions, FilterOptions {
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
