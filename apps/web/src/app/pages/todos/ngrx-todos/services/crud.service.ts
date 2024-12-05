import { Observable } from "rxjs"
import { BaseQuery } from "../models/pagination.model"
import { BaseEntity } from "../models/todo.model"

export interface CrudService<T> {
	getItems(): Observable<T[]>

	getItemsAsPromise(): Promise<T[]> // Yes, we can also use promises instead of Observables

	getItem(id: string): Observable<T>

	addItem(value: Partial<T>): Observable<T>

	updateItem(value: T): Observable<T>

	deleteItem(value: T): Observable<unknown>
}

export interface CrudServiceA<TEntity extends BaseEntity, TQuery extends BaseQuery> {
	getAll(): Observable<TEntity[]>

	getAllPaginated(query: TQuery): Observable<TEntity[]>

	getOne(id: Pick<TEntity, "id">): Observable<TEntity>

	addOne(value: Partial<TEntity>): Observable<TEntity>

	updateOne(value: Partial<TEntity>): Observable<TEntity>

	deleteOne(id: Pick<TEntity, "id">): Observable<{ success: true }>
}
