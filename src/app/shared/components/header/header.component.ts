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
  isWide = true;

  constructor(private _layoutService: LayoutService) {}

  ngOnInit(): void {
    this._layoutService.isWide().subscribe((isWide) => {
      this.isWide = isWide;
    });
  }

  toggleMainSidebar() {
    this._layoutService.toggleSidebar();
  }

  toggleSettingsDrawer() {
    this._layoutService.setShowSettings(true);
  }
}
