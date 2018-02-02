import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BaiduMapModule} from 'angular2-baidu-map';
import {DbService} from './db.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { SsPipe } from './pipe/ss.pipe';
import { SpPipe } from './pipe/sp.pipe';

export const ROUTES: Routes = [
  {path: 's', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SsPipe,
    SpPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BaiduMapModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
