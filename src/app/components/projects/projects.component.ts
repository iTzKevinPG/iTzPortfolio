import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExpandableComponent } from '../expandable/expandable.component';
import { LightboxDirective } from '../../directives/lightbox.directive';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
	selector: 'app-projects',
	standalone: true,
	imports: [CommonModule, ExpandableComponent, LightboxDirective, RevealOnScrollDirective],
	templateUrl: './projects.component.html',
	styleUrl: './projects.component.scss'
})
export class ProjectsComponent {}
