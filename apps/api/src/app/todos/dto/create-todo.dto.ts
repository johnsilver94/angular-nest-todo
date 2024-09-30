import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateTodoDto {
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
