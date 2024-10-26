/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Component, OnInit, ViewChild } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CdkTableModule } from "@angular/cdk/table"
import { MatSort, MatSortable, MatSortModule } from "@angular/material/sort"
import { MatTableDataSource } from "@angular/material/table"
import { debounceTime, distinctUntilChanged, Subject, tap } from "rxjs"
import { HighlightSearch } from "../../pipes/highlight.pipe"
import { PaginatorComponent } from "../../components/paginator/paginator.component"
import { UserQuery } from "../../query/users.query"
import { ROW_ANIMATION } from "../../animations/row.animation"
import { User } from "../../models/user.model"
import { UsersService } from "../../services/users.service"

@Component({
	selector: "ant-cdk-table",
	standalone: true,
	imports: [
		FormsModule,
		CdkTableModule,
		MatSortModule,
		ReactiveFormsModule,
		RouterOutlet,
		HighlightSearch,
		PaginatorComponent
	],
	templateUrl: "./cdk-table.component.html",
	styleUrl: "./cdk-table.component.scss",
	providers: [UserQuery, HighlightSearch],
	animations: [ROW_ANIMATION]
})
export class CdkTableComponent implements OnInit {
	users: MatTableDataSource<User>
	initialSort: MatSortable = {
		id: "id",
		start: "desc",
		disableClear: false
	}
	initialFilter = {
		website: ""
	}
	columnsToDisplay = ["id", "fullName", "email", "website"]
	queryForm: FormGroup

	nameQueryChanged: Subject<string> = new Subject<string>()
	@ViewChild("pagination", { static: true })
	// @ts-expect-error
	paginator: PaginatorComponent
	// @ts-expect-error
	@ViewChild(MatSort, { static: true }) sort: MatSort
	pageSize = 10

	domains: string[] = []

	constructor(
		private usersService: UsersService,
		public userQuery: UserQuery
	) {
		this.users = new MatTableDataSource()
		this.queryForm = this.createQueryForm()
	}

	ngOnInit(): void {
		// sort definition
		this.sort.sort(this.initialSort)
		// mat table definition
		this.users.filterPredicate = this.userQuery.createFilter()
		this.users.paginator = this.paginator
		this.users.sort = this.sort
		this.users.filter = this.userQuery.filter(this.initialFilter)
		this.queryForm.get("website")?.setValue(this.initialFilter.website)

		// connect data to table
		this.usersService
			.getUsers()
			.pipe(
				tap((users) => {
					const domains = users.map((user) => user.website.split(".").slice(-1)[0])
					this.domains = [...new Set<string>(domains)]
				})
			)
			.subscribe((users) => (this.users.data = users))

		// form filter listener
		this.queryForm.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((filterValues) => {
			this.users.filter = this.userQuery.filter(filterValues)
		})
	}

	clearFilters() {
		this.queryForm.reset(this.createQueryForm().getRawValue())
	}

	createQueryForm() {
		return new FormGroup({
			fullName: new FormControl(""),
			email: new FormControl(""),
			website: new FormControl("")
		})
	}

	// filter on demand without forms
	manualFilter() {
		this.users.filter = this.userQuery.filter({
			website: "com",
			fullName: "ba"
		})
	}
}
