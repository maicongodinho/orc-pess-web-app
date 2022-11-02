import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { ErrorInterceptorService } from './shared/services/error-interceptor.service';
import { NgxMaskModule } from 'ngx-mask';
import { IconService } from 'carbon-components-angular';

import Logout20 from '@carbon/icons/es/logout/20';
import Add20 from '@carbon/icons/es/add/20';
import Edit20 from '@carbon/icons/es/edit/20';
import Send20 from '@carbon/icons/es/send/20';
import TrashCan20 from '@carbon/icons/es/trash-can/20';
import MisuseOutline20 from '@carbon/icons/es/misuse--outline/20';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule, NgxMaskModule.forRoot()],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(protected iconService: IconService) {
    this.iconService.registerAll([Logout20, Add20, Edit20, Send20, TrashCan20, MisuseOutline20]);
  }
}
