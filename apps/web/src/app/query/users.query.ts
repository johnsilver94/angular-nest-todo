import { Injectable } from "@angular/core"
import { Query, QueryDefinition } from "./../cdk/query"
import { User } from "../models/user.model"

type FilterPropName = "name" | "email" | "website"

type U = User

type IFilterValues = Partial<U>

@Injectable()
export class UserQuery extends Query<U, IFilterValues, FilterPropName> {
	override queryDefinition: QueryDefinition<U, IFilterValues, FilterPropName>[] = [
		{
			filterPropName: "name",
			queryFn: this.findByName
		},
		{
			filterPropName: "email",
			queryFn: this.findByEmail
		},
		{
			filterPropName: "website",
			queryFn: this.findByWebsite
		}
	]

	private findByName(row: U, query: IFilterValues) {
		return row.fullName.toLowerCase().indexOf(query.fullName?.toLowerCase() || "") != -1
	}

	private findByEmail(row: U, query: IFilterValues) {
		return row.email.toLowerCase().indexOf(query.email?.toLowerCase() || "") != -1
	}

	private findByWebsite(row: U, query: IFilterValues) {
		const regexp = new RegExp(`${query.website?.toLowerCase()}$`, "i")
		return row.website.toLowerCase().search(regexp) >= 0
	}
}
