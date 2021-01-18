import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Weather } from '@app/_services/weather';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    rawlist: Location;

    constructor(
        private accountService: AccountService,
        private http: HttpClient,
        private weather: Weather
        ) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {}
    getRawData(location: string) {
      this.ngOnInit();
        this.weather
          .getRawData(location)
          .subscribe(
            data => this.rawlist=data,
            error => console.log(error)
          );
         
      }

    
}

