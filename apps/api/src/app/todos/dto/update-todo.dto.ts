import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateTodoDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	description: string

	@IsBoolean()
	@IsOptional()
	completed = false
}
