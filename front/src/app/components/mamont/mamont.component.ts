import { Component, OnInit } from '@angular/core';
import {MamontsensorsService} from '../../services/mamontsensors.service';
import {HomeLib} from '../../constants/home-lib';

@Component({
  selector: 'app-mamont',
  templateUrl: './mamont.component.html',
  styleUrls: ['./mamont.component.css']
})
export class MamontComponent implements OnInit {
 // private data: any = {};
  private dateFormat: string;
  constructor(public mamontsensorsService: MamontsensorsService) {
    this.dateFormat = HomeLib.DATE_TIME_FORMAT;
  }

  ngOnInit() {
    this.mamontsensorsService.getSensorsData();
  }

}
