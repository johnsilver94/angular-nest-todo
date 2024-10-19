import { Injectable } from "@angular/core"
import { catchError, map, Observable, of, startWith } from "rxjs"
import { LoadingState, Paginated, QueryOptions } from "../models/pagination.model"
import { Todo } from "../models/todo.model"
import { HttpClient } from "@angular/common/http"

@Injectable({ providedIn: "root" })
export class TodosService {
	constructor(private http: HttpClient) {}

	getTodosWithLoader(query: QueryOptions): Observable<LoadingState<Paginated<Todo>>> {
		return this.http.post<Paginated<Todo>>("api/todos/paginated", query).pipe(
			map((data) => ({ data, loading: false })),
			catchError((error) => of({ error, loading: false })),
			startWith({ error: null, loading: true })
		)
	}

	getTodosPaginated(query: QueryOptions): Observable<Paginated<Todo>> {
		return this.http.post<Paginated<Todo>>("api/todos/paginated", query)
	}

	getTodoById(id: number): Observable<LoadingState<Todo>> {
		return this.http.get<Todo>(`api/todos/${id}`).pipe(
			map((data) => ({ data, loading: false })),
			catchError((error) => of({ error, loading: false })),
			startWith({ error: null, loading: true })
		)
	}

	updateTodo(id: number, todo: Omit<Todo, "id">): Observable<LoadingState<Todo>> {
		return this.http.put<Todo>(`api/todos/${id}`, todo).pipe(
			map((data) => ({ data, loading: false })),
			catchError((error) => of({ error, loading: false })),
			startWith({ error: null, loading: true })
		)
	}

	deleteTodo(id: number): Observable<LoadingState<{ success: boolean }>> {
		return this.http.delete<null>(`api/todos/${id}`).pipe(
			map(() => ({ data: { success: true }, loading: false })),
			catchError((error) => of({ error, loading: false })),
			startWith({ error: null, loading: true })
		)
	}
}
