import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { userPost } from '../continut/continut.component';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
  @Input() userPost:userPost;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToUserPostDetails(){
    this.router.navigate(['user-post-details/' +  this.userPost.id])

  }
}
