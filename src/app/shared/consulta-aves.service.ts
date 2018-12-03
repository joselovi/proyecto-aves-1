import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ave } from '../ave';
import { Observable } from 'rxjs';

@Injectable()
export class ConsultaAvesService {

    private avesUrl = 'api/aves';  // URL to web api

    constructor(private http: HttpClient) {}

    getName(): Observable<Ave[]> {
        return this.http.get<Ave[]>('url');
    }

    searchAves(term: string): Observable<Ave[]> {
        return this.http.get<Ave[]>(`${this.avesUrl}/?name=${term}`);
    }
}
