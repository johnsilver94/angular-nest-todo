import { Injectable } from "@angular/core"
import { catchError, map, Observable, of, startWith } from "rxjs"
import { LoadingState, PaginationResponse, QueryOptionsQuery } from "../models/pagination.model"
import { Todo } from "../models/todo.model"
import { HttpClient } from "@angular/common/http"

@Injectable({ providedIn: "root" })
export class TodosService {
	constructor(private http: HttpClient) {}
	getUsersPaginatedWithLoader(query: QueryOptionsQuery): Observable<LoadingState<PaginationResponse<Todo>>> {
		return this.http.post<PaginationResponse<Todo>>("api/todos/paginated", query).pipe(
			map((data) => ({ data, loading: false })),
			catchError((error) => of({ error, loading: false })),
			startWith({ error: null, loading: true })
		)
	}
	getUsersPaginated(query: QueryOptionsQuery): Observable<PaginationResponse<Todo>> {
		return this.http.post<PaginationResponse<Todo>>("api/todos/paginated", query)
	}
}
