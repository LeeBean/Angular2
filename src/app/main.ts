import { environment } from './environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { AppModule } from './app.module';
if (environment.production) {//生产模式
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
