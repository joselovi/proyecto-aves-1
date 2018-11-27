import { Component } from '@angular/core';
import { AvesService } from '../shared/aves.service';

@Component({
  selector: 'aves-app',
  templateUrl: './aves.component.html',
  styleUrls: ['./aves.component.css']
})
export class AvesComponent {
  public nombre_Comun: any = 'aves commun name';
  public nombre_Cientifico: any = 'aves commun name';

  constructor(/* private aves:AvesService */) {

  }
 }