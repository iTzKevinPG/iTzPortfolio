import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/config/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
	.then((appRef) => {
		const platformId = appRef.injector.get(PLATFORM_ID);
		if (!isPlatformBrowser(platformId)) {
			return;
		}

		const documentRef = appRef.injector.get(DOCUMENT);
		documentRef.body.classList.remove('app-prehydrated');
		documentRef.body.classList.add('app-hydrated');
	})
	.catch((err) => console.error(err));
