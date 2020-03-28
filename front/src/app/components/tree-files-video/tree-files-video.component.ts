
import {Component, NgZone, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import { Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../login/services';
import {MessageService} from '../../services/message.service';
import {PlayerVideoComponent} from '../player-video/player-video.component';
import {Router} from '@angular/router';

const REST_SERVER = '/video/?dir=/var/services/homes/igor/VIDEOCOURSES';
// const REST_SERVER = '/video/?dir=/home/client/work/tmp';

export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = true,
              public isLoading = false) {}
}

@Injectable({providedIn: 'root'})
export class DynamicDatabase {
  constructor(private httpClient: HttpClient ) { }

  dataMap: Map<string, string[]>;
//  rootLevelNodes: string[] = ['Видеозаписи по годам'];

  rootLevelNodes: string[] = ['.'];


  /** Инициализируем данные для корневого узла */
  initialData(): DynamicFlatNode[] {
    // console.log('---initData----');
  this.getData(this.rootLevelNodes[0]);
  return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true, true));

  }
  // Получаем данные с REST сервера
  async getData(root: string) {
    await this.httpClient.get( REST_SERVER ).subscribe( (data: any) => {
      // console.log('request', data);
      this.dataMap = new Map<string, string[]>( data);
      // this.dataMap.set('.', [this.rootLevelNodes[0]]);
    }, (err) => {
      console.error('>>>>>>Error<<<<<', err);

    });
  }
  getChildren(node: string): string[] | undefined {
     // console.log('----getChildren----' + node);
      return this.dataMap.get(node);

  }

  isExpandable(node: string): boolean {
     return this.dataMap.has(node);
  }
}
export class DynamicDataSource implements DataSource<DynamicFlatNode> {


  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    // console.log('-----', this.dataChange.value);
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
    // console.log(">>>>>>"+value);
  }
  // tslint:disable-next-line:variable-name
  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
              // tslint:disable-next-line:variable-name
              private _database: DynamicDatabase
              ) {}
  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(async change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        await this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });
    return  merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}
  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this._database.getChildren(node.item);
    const index = this.data.indexOf(node);
    // ------------------------------
   // console.log('---->>>>', node.item);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;
    // setTimeout(() => {
    if (expand) {
        const nodes = children.map(name =>
          new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(name)));
        // console.log('---открытие узла-->');

        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length   && this.data[i].level > node.level; i++, count++) {
          // console.log('---Закрытие узла-->' + i);
        }
        this.data.splice(index + 1, count);
      }
      // notify the change
    this.dataChange.next(this.data);
    node.isLoading = false;
    // }, 1000);
  }
}


@Component({
  selector: 'app-tree-files-video',
  templateUrl: './tree-files-video.component.html',
  styleUrls: ['./tree-files-video.component.css']
})

export class TreeFilesVideoComponent implements OnInit {

  constructor(

    database: DynamicDatabase ,
    private messageService: MessageService,
    private zone: NgZone,
    private router: Router,
    private playVideoDialog: MatDialog,
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();

  }


treeControl: FlatTreeControl<DynamicFlatNode>;

dataSource: DynamicDataSource;

getLevel = (node: DynamicFlatNode) => node.level;

isExpandable = (node: DynamicFlatNode) => {
  return node.expandable;
}

// Есть ли в узле дочки
// tslint:disable-next-line:variable-name
hasChild = (_: number, _nodeData: DynamicFlatNode) => {
  return _nodeData.expandable;
}





ngOnInit(): void {
}

  getVideo(item: string) {
  // Можно выгружать только mp4
    if (item.substr( item.lastIndexOf('.')) === '.mp4' ) {
    this.zone.runOutsideAngular(() => {
      window.open('/getvideo/?path=' + item);
      // window.open('/python/getfile');
    });
  } else {
   this.messageService.success('Доступ к файлу :<' + item + '> Отсутствует! ');
  }
  }
  getVideoStream(item: string) {
      // this.router.navigateByUrl('/playvideo/?path=' + item);

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {pathVideo: item};
      // Конфигурация геометрии всплывающего окна
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.position = {
        top: '50px',
        left: '100px'
      };
      // *Контейнер для диалоговых окон*
      // стиль должен быть размещен на самом верхнем уровне (см файл: styles.css)
      dialogConfig.panelClass = 'my-dialog';
      this.playVideoDialog.open(PlayerVideoComponent, dialogConfig);
    }
}

