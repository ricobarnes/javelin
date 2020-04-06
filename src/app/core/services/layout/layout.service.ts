import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _isWide: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _showSettings: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  setIsWide(val: boolean) {
    this._isWide.next(val);
  }

  isWide(): Observable<boolean> {
    return this._isWide.asObservable();
  }

  toggleSidebar() {
    this._isWide.next(!this._isWide.value);
  }

  setShowSettings(val: boolean) {
    this._showSettings.next(val);
  }
}
