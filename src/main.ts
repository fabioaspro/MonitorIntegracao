import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NgxMaskDirective, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

//bootstrapApplication(AppComponent, appConfig)
//  .catch((err) => console.error(err));

  bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, PoModule, FormsModule, ReactiveFormsModule),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideEnvironmentNgxMask(),
        provideRouter(routes),   
       
    ]
})
  .catch(err => console.error(err));