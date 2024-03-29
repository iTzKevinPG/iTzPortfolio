import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { LoaderService } from '../shared/services/loader.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, SpinnerComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	constructor(private loader: LoaderService) {}

	ngOnInit() {
		this.loader.showLoader();
		setTimeout(() => {
			this.loader.hideLoader();
		}, 2000);
	}
}
