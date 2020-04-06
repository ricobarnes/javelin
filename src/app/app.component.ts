import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LayoutService } from './core/services/layout/layout.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  isWide = true;

  settingsFormGroup: FormGroup = this._fb.group({
    phase: new FormControl(),
    memberSort: new FormControl(),
    allowRegistrations: new FormControl(),
    allowUserEdits: new FormControl(),
  });

  example1Options = [
    { name: 'Phase 1', id: 1 },
    { name: 'Phase 2', id: 2 },
  ];

  example2Options = [
    { name: 'Draft', id: 0 },
    { name: 'Todo', id: 1 },
    { name: 'In Progress', id: 2 },
    { name: 'Completed', id: 3 },
  ];

  @ViewChild('mainDrawer') mainDrawer: MatDrawer;
  @ViewChild('settingsDrawer') settingsDrawer: MatDrawer;

  constructor(
    private _layoutService: LayoutService,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this._layoutService.isWide().subscribe((val) => {
      this.isWide = val;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._layoutService.getShowSettings().subscribe((val) => {
        this.settingsDrawer.opened = val;
      });
    });
  }

  saveSettings() {
    console.log('Save Settings');

    this.settingsDrawer.close();
  }
}
