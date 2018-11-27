import { Component } from '@angular/core';
import { ConsultaAvesService } from '../shared/consulta-aves.service';
import { Ave } from '../ave';
import { Observable, Subject } from 'rxjs';
import { AVES } from '../mock-aves';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'consulta-aves-app',
  templateUrl: './consulta-aves.component.html',
  styleUrls: ['./consulta-aves.component.css']
})
export class ConsultaAvesComponent {
  public aves1$: Observable<Ave[]>;
  public aves: Ave[] = AVES;
  public nombreAve: string;
  public zona: any = 'Zona de Aves';
  private searchTerms = new Subject<string>();

  constructor(private consultaAvesService: ConsultaAvesService){
    console.warn('service seb', consultaAvesService.getName);
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    /* this.aves = AVES; */
    /* this.aves$ = this.consultaAvesService.getName()
    .subscribe(nombreAve => this.nombreAve = nombreAve); */
    this.aves1$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.consultaAvesService.searchAves(term))
    );
  }
  
}