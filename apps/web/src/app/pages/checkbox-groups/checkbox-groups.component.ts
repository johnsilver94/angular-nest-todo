import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { PermissionsStore } from "./permissions.store"
import { CheckboxGroupComponent } from "./checkbox-group/checkbox-group.component"

@Component({
	selector: "ant-checkbox-groups",
	standalone: true,
	imports: [MatCheckboxModule, FormsModule, CheckboxGroupComponent],
	templateUrl: "./checkbox-groups.component.html",
	styleUrl: "./checkbox-groups.component.scss",
	providers: [PermissionsStore],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupsComponent {
	readonly store = inject(PermissionsStore)
}
