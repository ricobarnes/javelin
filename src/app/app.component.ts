import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { LayoutService } from './core/services/layout/layout.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { version } from '../../package.json';
import { ColorPaletteService } from './core/services/color-palette/color-palette.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Project } from './feature/models/project';
import { ProjectService } from './core/services/project/project.service';

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
    primaryColorHex: new FormControl(),
    secondaryColorHex: new FormControl(),
  });

  example1Options = [
    { name: 'Phase 1', id: 0 },
    { name: 'Phase 2', id: 1 },
  ];

  example2Options = [
    { name: 'Draft', id: 0 },
    { name: 'Todo', id: 1 },
    { name: 'In Progress', id: 2 },
    { name: 'Completed', id: 3 },
  ];

  primaryColor: string = this._colorPaletteService.primaryColor;
  secondaryColor: string = this._colorPaletteService.secondaryColor;

  @ViewChild('mainDrawer') mainDrawer: MatDrawer;
  @ViewChild('searchDrawer') searchDrawer: MatDrawer;
  @ViewChild('settingsDrawer') settingsDrawer: MatDrawer;
  // @ViewChild('searchInput') searchInput: ElementRef;

  searchFormGroup: FormGroup = this._fb.group({
    searchCtrl: new FormControl(),
  });

  searchList = [];

  constructor(
    private _layoutService: LayoutService,
    private _fb: FormBuilder,
    private _colorPaletteService: ColorPaletteService,
    private _projectService: ProjectService
  ) {
    this._colorPaletteService.initColorPalette();
  }

  ngOnInit() {
    this._layoutService.isWide().subscribe((val) => {
      this.isSidebarWide = val;
    });

    this.version = `Version ${version}`;

    this.settingsFormGroup.patchValue({
      phase: 0,
      status: 1,
      slideToggle1: true,
      slideToggle2: false,
      primaryColorHex: this._colorPaletteService.primaryColor,
      secondaryColorHex: this._colorPaletteService.secondaryColor,
    });

    this.settingsFormGroup.valueChanges.subscribe((val) => {
      console.log('val', val);
      console.log('primaryColorHex', val.primaryColorHex);
      console.log('secondaryColorHex', val.secondaryColorHex);

      const primary = val.primaryColorHex;
      const secondary = val.secondaryColorHex;

      this._colorPaletteService.savePrimaryColor(primary);
      this._colorPaletteService.saveSecondaryColor(secondary);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._layoutService.getShowSettings().subscribe((val) => {
        this.settingsDrawer.opened = val;
      });
    });

    //
    this.searchFormGroup.valueChanges.subscribe((ctrl) => {
      const searchText: string = ctrl.searchCtrl;
      let results = [];

      console.log('ctrl', ctrl);
      console.log('searchText', searchText);

      if (searchText.length >= 3) {
        this._projectService.findAll().subscribe((projs) => {
          results = this._projectService.search(projs, searchText);

          console.log('results', results);

          this.searchList = results;
        });
      } else {
        this.searchList = [];
      }
    });
  }

  saveSettings() {
    console.log('Save Settings');

    console.log('settingsFormGroup', this.settingsFormGroup);
    console.log('settingsFormGroup value', this.settingsFormGroup.value);

    localStorage.setItem('primaryColorHex', this.primaryColor);
    localStorage.setItem('secondaryColorHex', this.secondaryColor);

    this.settingsDrawer.close();
  }

  primaryColorChange(val: MatButtonToggleChange) {
    console.log('val', val.source.value);
    // this.setPrimary(val.source.value);
    this.primaryColor = val.source.value;

    this.settingsFormGroup.get('primaryColorHex').setValue(val.source.value);
  }

  secondaryColorChange(val: MatButtonToggleChange) {
    console.log('val', val.source.value);
    // this.setSecondary(val.source.value);
    this.secondaryColor = val.source.value;

    this.settingsFormGroup.get('secondaryColorHex').setValue(val.source.value);
  }

  setPrimary(colorHex: string) {
    this._colorPaletteService.savePrimaryColor(colorHex);
  }

  setSecondary(colorHex: string) {
    this._colorPaletteService.saveSecondaryColor(colorHex);
  }

  onChangePrimaryColor(color) {
    console.log('color', color);
    this.settingsFormGroup.get('primaryColorHex').setValue(color);
  }

  onChangeSecondaryColor(color) {
    console.log('color', color);
    this.settingsFormGroup.get('secondaryColorHex').setValue(color);
  }

  openSearchDrawer() {
    this.searchDrawer.toggle();
  }
}
