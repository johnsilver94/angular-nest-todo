import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Paginated, QueryOptions } from "../../../../models/pagination.model"
import { Todo } from "../../../../models/todo.model"
import { CreateTodo, UpdateTodo } from "../models/todo.model"
import { CrudServiceA } from "./crud.service"

@Injectable({ providedIn: "root" })
export class TodosService {
	constructor(private http: HttpClient) {}

	getTodosPaginated(query: QueryOptions): Observable<Paginated<Todo>> {
		return this.http.post<Paginated<Todo>>("api/todos/paginated", query)
	}

	getTodoById(id: number): Observable<Todo> {
		return this.http.get<Todo>(`api/todos/${id}`)
	}

	updateTodo({ id, ...data }: UpdateTodo): Observable<Todo> {
		return this.http.patch<Todo>(`api/todos/${id}`, data)
	}

	addTodo(todo: CreateTodo): Observable<Todo> {
		return this.http.post<Todo>("api/todos", todo)
	}

	deleteTodo(id: number): Observable<{ success: boolean }> {
		return this.http.delete<{ success: boolean }>(`api/todos/${id}`)
	}
}

export class TodosServiceA implements CrudServiceA<Todo, QueryOptions> {
	constructor(private http: HttpClient) {}

	getAll(): Observable<Todo[]> {
		return this.http.get<Todo[]>("api/todos")
	}

	getAllPaginated(query: QueryOptions): Observable<Todo[]> {
		return this.http.post<Todo[]>("api/todos/paginated", query)
	}

	getOne(id: Pick<Todo, "id">): Observable<Todo> {
		return this.http.get<Todo>(`api/todos/${id}`)
	}

	addOne(value: Partial<Todo>): Observable<Todo> {
		return this.http.post<Todo>("api/todos", value)
	}

	updateOne(value: Partial<Todo>): Observable<Todo> {
		return this.http.put<Todo>(`api/todos/${value.id}`, value)
	}

	deleteOne(id: Pick<Todo, "id">): Observable<{ success: true }> {
		return this.http.delete<{ success: true }>(`api/todos/${id}`)
	}
}
