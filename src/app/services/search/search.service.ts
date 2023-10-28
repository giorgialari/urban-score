import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTextSubject = new BehaviorSubject<string>(''); // BehaviorSubject con valore iniziale vuoto
  public searchText$ = this.searchTextSubject.asObservable(); // Observable per sottoscrivere il valore

  setSearchText(text: string): void {
    this.searchTextSubject.next(text);
  }
}
