import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {
	private apiCount = 0;
	private isLoadingSubject = new BehaviorSubject<boolean>(false);
	isLoading$ = this.isLoadingSubject.asObservable();

	showLoader(): void {
		this.apiCount++;
		if (this.apiCount === 1) {
			this.isLoadingSubject.next(true);
		}
	}

	hideLoader(): void {
		if (this.apiCount === 0) {
			return;
		}
		this.apiCount--;
		if (this.apiCount === 0) {
			this.isLoadingSubject.next(false);
		}
	}
}
