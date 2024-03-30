import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{
		path: 'dashboard',
		loadComponent: () => import('@features/shell/shell.component').then((c) => c.ShellComponent),
		children: [
			{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
			{
				path: 'welcome',
				loadComponent: () => import('@features/shell/pages/prueba/prueba.component').then((c) => c.PruebaComponent)
			},
			{ path: '**', redirectTo: 'welcome' }
		]
	},
	{ path: '**', redirectTo: 'dashboard' }
];
