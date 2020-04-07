import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LayoutService } from './core/services/layout/layout.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { version } from '../../package.json';
import { ColorPaletteService } from './core/services/color-palette/color-palette.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  isSidebarWide = true;
  version = version;

  settingsFormGroup: FormGroup = this._fb.group({
    phase: new FormControl(),
    status: new FormControl(),
    slideToggle1: new FormControl(),
    slideToggle2: new FormControl(),
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
    private _fb: FormBuilder,
    private _colorPaletteService: ColorPaletteService
  ) {
    this._colorPaletteService.initColorPalette();
  }

  ngOnInit() {
    this._layoutService.isWide().subscribe((val) => {
      this.isSidebarWide = val;
    });

    this.version = `Version ${version}`;
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

  setPrimary(colorHex: string) {
    this._colorPaletteService.savePrimaryColor(colorHex);
  }

  setSecondary(colorHex: string) {
    this._colorPaletteService.saveSecondaryColor(colorHex);
  }
}
