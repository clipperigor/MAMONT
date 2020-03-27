import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snack: MatSnackBar) { }
  error(message: string) {
    this.snack.open(message, 'Ошибка', {duration: 5000, horizontalPosition: 'center',
      verticalPosition: 'top', panelClass: ['panel-error']
    });
  }
  success(message: string) {
    this.snack.open(message, 'Выполнено', {duration: 5000, horizontalPosition: 'center',
      verticalPosition: 'top', panelClass: ['panel-info']
    });
  }
}
