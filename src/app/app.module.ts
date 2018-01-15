import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BaiduMapModule} from 'angular2-baidu-map';
import {DbService} from './db.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { SsPipe } from './pipe/ss.pipe';

export const ROUTES: Routes = [
  {path: 's', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SsPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BaiduMapModule.forRoot({ak: 'KO1QXsciIMhaFDzuRoBeQG1HQWf9nPBO'}),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
