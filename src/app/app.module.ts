﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';;
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { ContinutComponent } from './continut/continut.component';;
import { UserPostDetailsComponent } from './user-post-details/user-post-details.component';
import { FeedComponent } from './feed/feed.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        HeaderComponent,
        CardComponent,
        ContinutComponent ,
        UserPostDetailsComponent ,
        FeedComponent
,
        FooterComponent    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };