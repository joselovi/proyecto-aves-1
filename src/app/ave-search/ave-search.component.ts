import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Ave } from '../ave';
import { AveService } from '../ave.service';

@Component({
  selector: 'app-ave-search',
  templateUrl: './ave-search.component.html',
  styleUrls: [ './ave-search.component.scss' ]
})
export class AveSearchComponent implements OnInit {
  aves$: Observable<Ave[]>;
  private searchTerms = new Subject<string>();

  constructor(private aveService: AveService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.aves$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.aveService.searchAves(term)),
    );
  }
}
