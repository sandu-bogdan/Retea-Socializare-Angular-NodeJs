import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountService, AlertService } from '@app/_services';
import { User } from '@app/_models';
import { ReplaySubject } from 'rxjs';

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

 


    statusLike(id: string){
        if(!(localStorage.getItem("likeStorage"))){
            localStorage.setItem("likeStorage","")
        }
        var getLocalStorageLike = localStorage.getItem("likeStorage");
        var likeStatus = getLocalStorageLike.search('#' + id + ','); 
        return likeStatus; 
    }

    likeNumber(id: string){
        //var count : number = (id.split(",").length - 1);
        
        var count = (id.split(",").length - 1)
        if(count){
            return count
        }
        else{
            return '0'
        }
    }


    like(id: string, username: string, likeDB: string) {
        
        if(this.statusLike(id) != -1){

            var inlocuire = localStorage.getItem("likeStorage");
            var inlocuit = inlocuire.replace('#' + id + ',',"");
            localStorage.setItem("likeStorage", inlocuit)
         
        
            var sendLikeDB = likeDB.replace('#' + this.userLocal.id + ',',"")

            this.accountService.update(id, { like: sendLikeDB })
            .pipe(first())
            .subscribe(() => {
                //this.alertService.success('Unlike successful', { keepAfterRouteChange: true });
                    this.ngOnInit();


                    //this.likeStorage=localStorage.getItem('likeStorage');
                    //if(this.likeStorage=null){this.isLiking = null};
                }) 
        }
        else {

           
                localStorage.setItem('likeStorage', '#' + id + ',' + localStorage.getItem("likeStorage"));
                
            
                
        
        //this.accountService.update(id, { like: '#' + username + ','})
        this.accountService.update(id, { like: likeDB + '#' + this.userLocal.id + ','})
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