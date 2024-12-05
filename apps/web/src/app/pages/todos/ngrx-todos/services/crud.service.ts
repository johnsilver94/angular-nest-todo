import { Observable } from "rxjs"
import { BaseEntity, CreateOneEntity, UpdateOneEntity } from "../models/crud.model"
import { BaseQuery, Paginated } from "../models/pagination.model"

export interface CrudService<TEntity extends BaseEntity, TQuery extends BaseQuery> {
	getAll(): Observable<TEntity[]>

	getAllPaginated(query: TQuery): Observable<Paginated<TEntity>>

	getOne(id: Pick<TEntity, "id">): Observable<TEntity>

	addOne(value: CreateOneEntity<TEntity>): Observable<TEntity>

	updateOne(value: UpdateOneEntity<TEntity>): Observable<TEntity>

	deleteOne(id: Pick<TEntity, "id">): Observable<{ success: true }>
}
