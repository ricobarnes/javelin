import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rrp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //
    let blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = new Date();
    blob['name'] = 'filename';

    const fakeF: File = blob as File;

    console.log('blob', blob);
    console.log('fakeF', fakeF);
    console.log('fakeF JSON', JSON.stringify(stringifyFileObject(fakeF)));
  }
}

function stringifyFileObject(file) {
  const obj = {
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
  };

  return obj;
}

/*

DOC: application/msword
DOCX: application/vnd.openxmlformats-officedocument.wordprocessingml.document
PPT: application/vnd.ms-powerpoint
PPTX: application/vnd.openxmlformats-officedocument.presentationml.presentation

JPEG: image/jpeg
PNG: image/png
PDF: application/pdf

{"lastModifiedDate":"2020-05-01T03:37:09.836Z","name":"filename","size":0,"type":"text/html"}



application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, image/jpeg, image/png, application/pdf



*/
