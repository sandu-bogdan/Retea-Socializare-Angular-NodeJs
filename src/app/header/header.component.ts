import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { User } from '@app/_models';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
   }

  ngOnInit(): void {
  }
  logout() {
    this.accountService.logout();
}

}
