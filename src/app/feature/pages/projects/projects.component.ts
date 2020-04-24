import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../dialogs/project-dialog/project-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Project } from '../../models/project';

@Component({
  selector: 'rrp-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  //
  displayedColumns: string[] = [
    'name',
    'number',
    'description',
    'publicationDate',
    'author',
    'reviewer',
    'books',
    'articles',
    'type',
    'category',
    'tags',
    'notes',
    'phase',
    'status',
    'action',
  ];

  dataSource = new MatTableDataSource<Project>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.getProjects();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openProjectDialog() {
    const ref = this.dialog.open(ProjectDialogComponent, {
      data: { currentCount: this.dataSource.data.length },
      disableClose: true,
    });

    ref.afterClosed().subscribe((val: Project) => {
      console.log('proj val', val);

      if (val) {
        const updatedList = this.dataSource.data;
        updatedList.push(val);

        this.dataSource.data = updatedList;
        localStorage.setItem('projectList', JSON.stringify(updatedList));
      }
      const pList = localStorage.getItem('projectList');

      console.log('*** pList', pList);
    });
  }

  getProjects() {
    console.log('getProjects()');

    const pList = localStorage.getItem('projectList');

    console.log('pList', pList);

    // localStorage.clear();

    if (pList) {
      const pArr: Project[] = JSON.parse(pList);
      this.dataSource.data = pArr;
    } else {
      localStorage.setItem('projectList', JSON.stringify([]));
    }
  }

  previewProject(project: Project) {
    console.log('project', project);
  }

  editProject(project: Project) {
    console.log('project', project);
  }

  deleteProject(id: number) {
    console.log('id', id);

    const idx = this.dataSource.data.findIndex((val) => val.id === id);

    console.log('idx', idx);

    if (idx >= 0) {
      const pList = this.dataSource.data.slice(idx);
      console.log('pList', pList);

      //   localStorage.setItem('projectList', JSON.stringify(pList));

      //   this.dataSource.data = pList;
    }
  }
}
