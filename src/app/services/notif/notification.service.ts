import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar:MatSnackBar) { }

  showError(message:string){
    this.snackbar.open(message,'okay',{duration:3000,panelClass:['error-snackbar']})
  }

  showSuccess(message:string){
    this.snackbar.open(message,'okay',{duration:3000,panelClass:['success-snackbar']})
  }
}
