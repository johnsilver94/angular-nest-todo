import { Component } from "@angular/core"
import { ElfTodosRepository } from "./state/elf-todos.repository"
import { CommonModule } from "@angular/common"

@Component({
	selector: "ant-elf-todos",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./elf-todos.component.html",
	styleUrls: ["./elf-todos.component.scss"]
})
export class ElfTodosComponent {
	constructor(public todosRepo: ElfTodosRepository) {}
}
