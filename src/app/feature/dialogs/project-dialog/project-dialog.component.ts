import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Project } from '../../models/project';

@Component({
  selector: 'rrp-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss'],
})
export class ProjectDialogComponent implements OnInit {
  projectFormGroup: FormGroup;
  requesterFormGroup: FormGroup;
  documentFormGroup: FormGroup;

  @ViewChild('stepper') stepper: MatStepper;

  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProjectDialogComponent>
  ) {}

  ngOnInit(): void {
    this.projectFormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      number: [null, Validators.required],
      description: [null, Validators.required],
      publicationDate: [null, Validators.required],
      reviewer: [null, Validators.required],
      type: [null, Validators.required],
      tags: [null, Validators.required],
    });

    this.requesterFormGroup = this._formBuilder.group({
      author: [null, Validators.required],
    });

    this.documentFormGroup = this._formBuilder.group({
      books: null,
      articles: null,
    });

    //
    if (this.data && this.data.project) {
      this.initTable();
    }
  }

  nextStep() {
    this.stepper.next();
  }

  previousStep() {
    this.stepper.previous();
  }

  create() {
    console.log('CREATE');

    console.log('this.projectFormGroup', this.projectFormGroup.value);
    console.log('this.requesterFormGroup', this.requesterFormGroup.value);
    console.log('this.documentFormGroup', this.documentFormGroup.value);

    const proj: Project = {
      id: this.data.currentCount + 1,
      ...this.projectFormGroup.value,
      ...this.requesterFormGroup.value,
      ...this.documentFormGroup.value,
      phase: 'Tier 1',
      status: 'DRAFT',
    };

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close(proj);
    }, 2000);
  }

  initTable() {
    this.projectFormGroup.patchValue({
      name: this.data.project.name,
      number: this.data.project.number,
      description: this.data.project.description,
      publicationDate: this.data.project.publicationDate,
      reviewer: this.data.project.reviewer,
      type: this.data.project.type,
      tags: this.data.project.tags,
    });

    this.requesterFormGroup.patchValue({
      author: this.data.project.author,
    });

    this.documentFormGroup.patchValue({
      books: this.data.project.books,
      articles: this.data.project.articles,
    });
  }

  testAutofillForm() {
    this.projectFormGroup.patchValue({
      name: `TESTER-${this.data.currentCount + 1} Really Long Name `,
      number: `###-${this.data.currentCount + 1}`,
      description: `Example-${this.data.currentCount + 1}`,
      publicationDate: new Date(),
      reviewer: `Reviewer-${this.data.currentCount + 1}`,
      type: `Type-${this.data.currentCount + 1}`,
      tags: `Tag-${this.data.currentCount + 1}`,
    });

    this.requesterFormGroup.patchValue({
      author: `Requester-${this.data.currentCount + 1}`,
    });

    this.documentFormGroup.patchValue({
      books: `Book-${this.data.currentCount + 1}`,
      articles: `Really Long Name Article-${this.data.currentCount + 1}`,
    });
  }
}
