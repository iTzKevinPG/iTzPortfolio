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
export class HomeComponent {}
