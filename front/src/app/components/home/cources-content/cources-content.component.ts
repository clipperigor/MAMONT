import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-cources-content',
  templateUrl: './cources-content.component.html',
  styleUrls: ['./cources-content.component.css']
})
export class CourcesContentComponent implements OnInit {
    title: 'Описание серии курсов';

  constructor(private dialogRef: MatDialogRef<CourcesContentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

}
