import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ave } from './ave';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const aves = [
      { id: 11, nombreComun: 'Azulejo Palmero', nombreCientifico: 'Thraupis Palmarum' },
      { id: 12, nombreComun: 'Arañero Cejiblanco', nombreCientifico: 'Basileuterus Culicivorus' },
      { id: 13, nombreComun: 'Azulejo Común', nombreCientifico: 'Thraupis Episcopus' },
      { id: 14, nombreComun: 'Atrapamoscas Pechirojo', nombreCientifico: 'Pyrocephalus rubinus' },
      { id: 15, nombreComun: 'Barranquero Coronado', nombreCientifico: 'Momotus Momota' },
      { id: 16, nombreComun: 'Batara Carcajada', nombreCientifico: 'Thamnophilus Multistriatus' },
      { id: 17, nombreComun: 'Bichofue Griton', nombreCientifico: 'Pitangus Sulphuratus' },
      { id: 18, nombreComun: 'Buho de Anteojos', nombreCientifico: 'Pulsatrix Perspicillata' },
      { id: 19, nombreComun: 'Carpintero Buchipecoso', nombreCientifico: 'Colaptes Punctigula' },
      { id: 20, nombreComun: 'Carpintero Olivaceo', nombreCientifico: 'Picumnus Olivaceus' }
    ];
    return {aves};
  }

  // Overrides the genId method to ensure that a ave always has an id.
  // If the aves array is empty,
  // the method below returns the initial number (11).
  // if the aves array is not empty, the method below returns the highest
  // ave id + 1.
  genId(aves: Ave[]): number {
    return aves.length > 0 ? Math.max(...aves.map(ave => ave.id)) + 1 : 11;
  }
}
