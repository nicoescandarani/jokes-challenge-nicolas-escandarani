import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // constructor(private snackBar: MatSnackBar) {}

  showError(message: string) {
    console.log(message);

    // this.snackBar.open(message, 'Close', {
    //   duration: 3000, // Cierra después de 3000ms
    //   horizontalPosition: 'right',
    //   verticalPosition: 'top',
    //   panelClass: ['error-snackbar'] // Puedes añadir clases CSS para estilizar
    // });
  }
}
