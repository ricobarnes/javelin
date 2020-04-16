import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../dialogs/project-dialog/project-dialog.component';

@Component({
  selector: 'rrp-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openProjectDialog() {
    this.dialog.open(ProjectDialogComponent);
  }
}
