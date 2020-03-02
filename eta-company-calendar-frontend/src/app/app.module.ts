import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '~/app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventReminderSelectorComponent } from './event-reminder-selector/event-reminder-selector.component';
import { AuthService } from './shared/services/auth.service';
// http loader for translations file
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    EventReminderSelectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    // Own modules
    SharedModule,

    // ngx-translate
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient, AuthService],
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
      }
    }),
  ],
  providers: [
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  AuthService,
]
})
export class AppModule {
}
