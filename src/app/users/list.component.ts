import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountService, AlertService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    isLiking: boolean;
    userLocal: User;
    likeStorage: String;


    constructor(
        private accountService: AccountService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router
        ) {

            this.userLocal = this.accountService.userValue;
        }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id) 
            });
    }


    like(id: string, username: string, likeDB: string) {
        
        //localStorage.setItem('likeStorage', username);
        localStorage["likeStorage"] = JSON.stringify(username);
        //this.isLiking = true;
        
        if(likeDB == this.userLocal.username){
            this.accountService.update(id, { like: '0' })
            .pipe(first())
            .subscribe(() => {
                //this.alertService.success('Unlike successful', { keepAfterRouteChange: true });
                    this.ngOnInit();


                    //this.likeStorage=localStorage.getItem('likeStorage');
                    //if(this.likeStorage=null){this.isLiking = null};
                }) 
        }
        else {
        this.accountService.update(id, { like: username })
        .pipe(first())
            .subscribe(() => {
                //this.alertService.success('Like successful', { keepAfterRouteChange: true });
                    this.ngOnInit();


                    //this.likeStorage=localStorage.getItem('likeStorage');
                    //if(this.likeStorage=null){this.isLiking = null};
                }) 
            }
            
    }

    
}