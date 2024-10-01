import { Model, ModelCtor } from "sequelize-typescript"
import { Op, type Order, type WhereOptions } from "sequelize"
import { PaginationQuery, PaginationResponse } from "./paginator.types"

export default class Paginator<T extends Model> {
	private model: ModelCtor<T>

	constructor(model: ModelCtor<T>) {
		this.model = model
	}

	async paginate(query: PaginationQuery): Promise<PaginationResponse<T>> {
		const { pageNumber, pageSize, filterField, filterValue, sortField, sortDirection } = query

		let whereOptions: WhereOptions
		let orderOptions: Order

		if (filterField && filterValue) {
			whereOptions = { [filterField]: { [Op.iLike]: `%${filterValue}%` } }
		}
		if (sortField && sortDirection) {
			orderOptions = [[sortField, sortDirection]]
		}

		const totalCount = await this.model.count<T>({ where: whereOptions })

		const results = await this.model.findAll<T>({
			where: whereOptions,
			order: orderOptions,
			offset: (pageNumber - 1) * pageSize,
			limit: pageSize
		})

		return {
			data: results,
			pagination: {
				pageNumber,
				pageSize,
				pagesCount: Math.ceil(totalCount / pageSize),
				itemsCount: totalCount
			}
		}
	}
}
