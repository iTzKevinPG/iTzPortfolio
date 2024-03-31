import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, BackgroundComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	links: { [key: string]: string } = {
		['cv']: 'https://drive.google.com/file/d/164XeeSSt13x7djqbxHrIFwzGuDvOV50x/view?usp=sharing',
		['in']: 'https://www.linkedin.com/in/iitzcopkevinii/',
		['git']: 'https://github.com/iTzKevinPG'
	};

	openLink(url: string) {
		window.open(this.links[url], '_blank');
	}
}
