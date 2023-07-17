import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /*===== Variables =====*/
  loaderState = new Subject<boolean>();

  showLoader(): void {
    this.loaderState.next(true);
  }

  hideLoader(): void {
    this.loaderState.next(false);
  }
}
