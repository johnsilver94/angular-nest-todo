import { Observable } from "rxjs"

export interface CrudService<T> {
	getItems(): Observable<T[]>

	getItemsAsPromise(): Promise<T[]> // Yes, we can also use promises instead of Observables

	getItem(id: string): Observable<T>

	addItem(value: Partial<T>): Observable<T>

	updateItem(value: T): Observable<T>

	deleteItem(value: T): Observable<unknown>
}
