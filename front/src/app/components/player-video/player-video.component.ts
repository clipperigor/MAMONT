import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
// Константа для получения доступа к параметрам диалога
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-player-video',
  templateUrl: './player-video.component.html',
  styleUrls: ['./player-video.component.css']
})
export class PlayerVideoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PlayerVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }

}
