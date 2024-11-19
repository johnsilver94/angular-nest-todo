import { inject, Injectable } from "@angular/core"
import { CrudService } from "./crud.service"
import { Todo } from "./model"
import { HttpClient } from "@angular/common/http"
import { lastValueFrom, Observable } from "rxjs"

@Injectable({
	providedIn: "root"
})
export class TodoService implements CrudService<Todo> {
	private readonly http = inject(HttpClient)

	private url = "api/todos"

	getItems(): Observable<Todo[]> {
		return this.http.get<Todo[]>(this.url)
	}

	getItemsAsPromise() {
		return lastValueFrom(this.http.get<Todo[]>(this.url))
	}

	getItem(id: string) {
		return this.http.get<Todo>(`${this.url}/${id}`)
	}

	addItem(value: Partial<Todo>) {
		return this.http.post<Todo>(this.url, value)
	}

	updateItem(value: Todo) {
		return this.http.patch<Todo>(`${this.url}/${value.id}`, value)
	}

	deleteItem(value: Todo) {
		return this.http.delete(`${this.url}/${value.id}`)
	}
}
