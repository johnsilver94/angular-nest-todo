import { Module } from "@nestjs/common"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ConfigModule } from "./config/config.module"
import { DatabaseModule } from "./database/database.module"
import { TodosModule } from "./todos/todos.module"

@Module({
	imports: [DatabaseModule, ConfigModule, TodosModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
