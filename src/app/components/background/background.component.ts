import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-background',
	standalone: true,
	imports: [],
	templateUrl: './background.component.html',
	styleUrl: './background.component.scss'
})
export class BackgroundComponent implements OnInit {
	images: { [key: number]: string } = {
		1: 'html',
		2: 'css',
		3: 'js',
		4: 'ts',
		5: 'angular',
		6: 'aws',
		7: 'docker',
		8: 'git',
		9: 'dotnet',
		10: 'vsc',
		11: 'sql',
		12: 'kevin',
		13: 'mysql',
		14: 'node',
		15: 'react',
		16: 'figma'
	};

	items: string[] = [];

	constructor() {}

	getRandomImg() {
		return this.images[Math.floor(Math.random() * Object.keys(this.images).length) + 1];
	}

	ngOnInit() {
		this.items = Array.from({ length: 12 }, () => this.getRandomImg() ?? 'kevin');
	}
}
