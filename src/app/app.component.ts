import { Component, OnInit } from '@angular/core';
import { LayoutService } from './core/services/layout/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isWide = true;

  constructor(private _layoutService: LayoutService) {}

  ngOnInit() {
    this._layoutService.isWide().subscribe((val) => {
      this.isWide = val;
    });
  }

  toggleSidebar() {
    this._layoutService.setIsWide(!this.isWide);
  }
}
