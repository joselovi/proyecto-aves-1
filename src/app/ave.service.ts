import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Ave } from './ave';
import { AVES } from './mock-aves';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AveService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  /** Log a AveService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`AveService: ${message}`);
}

  getAves(): Observable<Ave[]> {
    // TODO: send the message _after_ fetching the aves
    this.messageService.add('AveService: fetched aves');
    return of(AVES);
  }

  getAve(id: number): Observable<Ave> {
    // TODO: send the message _after_ fetching the aves
    this.messageService.add(`AveService: fetched ave id=${id}`);
    return of(AVES.find(ave => ave.id === id));
  }
}

