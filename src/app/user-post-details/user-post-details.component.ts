import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';
import { User } from '@app/_models';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-user-post-details',
  templateUrl: './user-post-details.component.html',
  styleUrls: ['./user-post-details.component.less']
})
export class UserPostDetailsComponent implements OnInit {
  idUrl: string;
  users = null;
  userLocal: User;
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
    ) { 
      this.userLocal = this.accountService.userValue;
    }

  ngOnInit(): void {
    const idUrl =  this.idUrl = this.route.snapshot.params['id'];
    this.accountService.getAll()
    .pipe(first())
    .subscribe(users => this.users = users);
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
          this.ngOnInit();
        }) 
    }
    else {
      localStorage.setItem('likeStorage', '#' + id + ',' + localStorage.getItem("likeStorage"));
      this.accountService.update(id, { like: likeDB + '#' + this.userLocal.id + ','})
      .pipe(first())
        .subscribe(() => {
          this.ngOnInit();
            }) 
        }
        
      }
      

}
