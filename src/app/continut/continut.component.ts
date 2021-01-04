import { Component, OnInit } from '@angular/core';
export class userPost {
  id: number;
  userName: string;
  title: string;
  description: string;
  photo: string;
  constructor (
    id: number,
    userName: string,
    title: string,
    description: string,
    photo: string
    ){
      this.id = id;
      this.description = description;
      this.title = title;
      this.userName = userName;
      this.photo=photo;
    }
}
@Component({
  selector: 'continut',
  templateUrl: './continut.component.html',
  styleUrls: ['./continut.component.css']
})
export class ContinutComponent implements OnInit {
  userPosts:userPost[]=[ 
    new userPost(1,"Bogdan","De Craciun","Un craciun la mare","01.jpg"),
    new userPost(2,"Bogdan","Vacanta","Fara teme","07.jpg"),
    new userPost(3,"Bogdan","Vacanta","a fost frumos","03.jpg"),
    new userPost(4,"Bogdan","Vacanta","a fost frumos","04.jpg")
  ]
  

  constructor() { }

  ngOnInit(): void {
  }

}
