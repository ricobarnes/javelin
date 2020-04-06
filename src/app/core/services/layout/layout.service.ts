import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _isWide: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {}

  setIsWide(val: boolean) {
    this._isWide.next(val);
  }

  isWide(): Observable<boolean> {
    return this._isWide.asObservable();
  }
}
