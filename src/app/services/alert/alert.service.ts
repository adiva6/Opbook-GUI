import { MatSnackBar } from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';

@Injectable()
export class AlertService {
  private readonly ALERT_DURATION_IN_SECONDS = 5;

  constructor(private snackBar: MatSnackBar) {}

  public error(message: string, action?: string): void {
    this.openSnackBar(message, 'snackbar-error', action);
  }

  public info(message: string, action?: string): void {
    this.openSnackBar(message, 'snackbar-info', action);
  }

  public success(message: string, action?: string): void {
    this.openSnackBar(message, 'snackbar-success', action);
  }

  private openSnackBar(message: string, panelClass: string, action?: string): void {
    this.snackBar.open(message, action,
      { duration: this.ALERT_DURATION_IN_SECONDS * 1000, horizontalPosition: 'end',
        verticalPosition: 'bottom', panelClass: [panelClass] });
  }
}
