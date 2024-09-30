import { Module } from "@nestjs/common"
import { ConfigModule as ConfigModuleNest } from "@nestjs/config"
import * as Joi from "joi"

@Module({
	imports: [
		ConfigModuleNest.forRoot({
			isGlobal: false,
			validationSchema: Joi.object({
				DATABASE_HOST: Joi.string().required(),
				DATABASE_PORT: Joi.number().required(),
				DATABASE_USERNAME: Joi.string().required(),
				DATABASE_PASSWORD: Joi.string().required(),
				DATABASE_NAME: Joi.string().required()
			})
		})
	]
})
export class ConfigModule {}
