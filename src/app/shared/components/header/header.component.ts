import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rrp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  notificationCount = '1';
  messageCount = '9+';

  constructor() {}

  ngOnInit(): void {}
}
