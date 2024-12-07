import { effect } from "@angular/core"
import { getState, signalStoreFeature, withHooks } from "@ngrx/signals"

export function withLogger(name = "Store") {
	return signalStoreFeature(
		withHooks({
			onInit(store) {
				effect(() => {
					const state = getState(store)
					console.log(`${name} state changed`, state)
				})
			}
		})
	)
}
