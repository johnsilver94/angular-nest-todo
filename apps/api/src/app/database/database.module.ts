import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { SequelizeModule } from "@nestjs/sequelize"

@Module({
	imports: [
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				dialect: "postgres",
				host: configService.get<string>("DATABASE_HOST"),
				port: configService.get<number>("DATABASE_PORT"),
				username: configService.get<string>("DATABASE_USERNAME"),
				password: configService.get<string>("DATABASE_PASSWORD"),
				database: configService.get<string>("DATABASE_NAME"),
				// models: [],
				autoLoadModels: true,
				synchronize: true
			})
		})
	]
})
export class DatabaseModule {}
