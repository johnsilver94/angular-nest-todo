import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Paginated, QueryOptions } from "../../../../models/pagination.model"
import { Todo } from "../../../../models/todo.model"
import { CrudService } from "./crud.service"

@Injectable({ providedIn: "root" })
export class TodosService implements CrudService<Todo, QueryOptions> {
	constructor(private http: HttpClient) {}

	getAll(): Observable<Todo[]> {
		return this.http.get<Todo[]>("api/todos")
	}

	getAllPaginated(query: QueryOptions): Observable<Paginated<Todo>> {
		return this.http.post<Paginated<Todo>>("api/todos/paginated", query)
	}

	getOne({ id }: Pick<Todo, "id">): Observable<Todo> {
		return this.http.get<Todo>(`api/todos/${id}`)
	}

	addOne(data: Partial<Todo>): Observable<Todo> {
		return this.http.post<Todo>("api/todos", data)
	}

	updateOne({ id, ...data }: Partial<Todo>): Observable<Todo> {
		return this.http.patch<Todo>(`api/todos/${id}`, data)
	}

	deleteOne({ id }: Pick<Todo, "id">): Observable<{ success: true }> {
		return this.http.delete<{ success: true }>(`api/todos/${id}`)
	}
}
