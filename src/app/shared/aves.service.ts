import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AvesService {

    constructor(private http: HttpClient){}

    getName(){
        return this.http.get('url');
    }
}