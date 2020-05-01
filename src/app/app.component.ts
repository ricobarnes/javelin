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
import { Document } from './feature/models/document';
import { Task } from './feature/models/task';
import { Author } from './feature/models/author';
import { ProjectService } from './core/services/project/project.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentService } from './core/services/document/document.service';
import { TaskService } from './core/services/task/task.service';
import { AuthorService } from './core/services/author/author.service';

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

  searchFormGroup: FormGroup = this._fb.group({
    searchCtrl: new FormControl(),
  });

  searchList = [];

  constructor(
    private _layoutService: LayoutService,
    private _fb: FormBuilder,
    private _colorPaletteService: ColorPaletteService,
    private _projectService: ProjectService,
    private _documentService: DocumentService,
    private _taskService: TaskService,
    private _authorService: AuthorService
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

      console.log('ctrl', ctrl);
      console.log('searchText', searchText);

      if (searchText.length >= 3) {
        const projObs = this._projectService
          .findAll()
          .pipe(map((res) => this._projectService.search(res, searchText)));
        const authorObs = this._authorService
          .findAll()
          .pipe(map((res) => this._authorService.search(res, searchText)));
        const taskObs = this._taskService
          .findAll()
          .pipe(map((res) => this._taskService.search(res, searchText)));
        const docObs = this._documentService
          .findAll()
          .pipe(map((res) => this._documentService.search(res, searchText)));

        forkJoin([projObs, authorObs, taskObs, docObs]).subscribe((res) => {
          console.log('results', res);

          const flattenedArray = [].concat(...res);
          console.log('flattenedArray', res);

          this.searchList = flattenedArray;
        });
      } else {
        this.searchList = [];
      }
    });

    // const TESTsearchText = 'Rico';

    // const TESTprojObs = this._projectService
    //   .findAll()
    //   .pipe(map((res) => this._projectService.search(res, TESTsearchText)));
    // const TESTauthorObs = this._authorService
    //   .findAll()
    //   .pipe(map((res) => this._authorService.search(res, TESTsearchText)));
    // const TESTtaskObs = this._taskService
    //   .findAll()
    //   .pipe(map((res) => this._taskService.search(res, TESTsearchText)));
    // const TESTdocObs = this._documentService
    //   .findAll()
    //   .pipe(map((res) => this._documentService.search(res, TESTsearchText)));

    // forkJoin([TESTprojObs, TESTauthorObs, TESTtaskObs, TESTdocObs]).subscribe(
    //   (res) => {
    //     console.log('results', res);

    //     // const p = this.isProject(res[0][0]);
    //     // const a = this.isAuthor(res[1]);
    //     // const t = this.isTask(res[2]);
    //     // const d = this.isDocument(res[3]);

    //     // console.log(res[0][0]);
    //     // console.log(res[1]);
    //     // console.log(res[2]);
    //     // console.log(res[3]);
    //     // console.log({ p, a, t, d });

    //     this.searchList = res;
    //   }
    // );
  }

  isProject(object: any): object is Project {
    return 'publicationDate' in object;
  }

  isAuthor(object: any): object is Author {
    return 'address' in object;
  }

  isDocument(object: any): object is Document {
    return 'file' in object;
  }

  isTask(object: any): object is Task {
    return 'dateCompleted' in object;
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

  selectSearchItem(item: any) {
    console.log('item', item);
  }
}
