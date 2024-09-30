import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { Todo } from "./todo.model"
import { TodosService } from "./todos.service"
import { TodosController } from "./todos.controller"

@Module({
	imports: [SequelizeModule.forFeature([Todo])],
	providers: [TodosService],
	controllers: [TodosController],
	exports: [SequelizeModule]
})
export class TodosModule {}
