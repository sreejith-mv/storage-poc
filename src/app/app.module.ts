import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { ProvidersModule } from './services/data-providers/providers.module';
import { DatabaseAccessProvider } from './services/storage/database-access.provider';
import { AES256 } from '@awesome-cordova-plugins/aes-256/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ProvidersModule,
    IonicStorageModule.forRoot({
      // eslint-disable-next-line no-underscore-dangle
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB]
    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AES256],
  bootstrap: [AppComponent],
})
export class AppModule { }
