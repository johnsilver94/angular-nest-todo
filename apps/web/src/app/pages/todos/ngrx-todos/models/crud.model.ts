export type BaseEntity = { id: number; createdAt: string; updatedAt: string }

export type UpdateOneEntity<TEntity extends BaseEntity> = Pick<TEntity, "id"> &
	Partial<Omit<TEntity, "createdAt" | "updatedAt" | "id">>
export type CreateOneEntity<TEntity extends BaseEntity> = Omit<TEntity, "id" | "createdAt" | "updatedAt">
