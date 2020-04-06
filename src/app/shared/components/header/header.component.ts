import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout/layout.service';

@Component({
  selector: 'rrp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  notificationCount = '1';
  messageCount = '9+';

  constructor(private _layoutService: LayoutService) {}

  ngOnInit(): void {}

  toggleMainSidebar() {
    this._layoutService.toggleSidebar();
  }

  toggleSettingsDrawer() {
    this._layoutService.setShowSettings(true);
  }
}
