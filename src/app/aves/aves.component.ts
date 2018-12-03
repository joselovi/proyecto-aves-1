import { Component, OnInit } from '@angular/core';

import { Ave } from '../ave';
import { AveService } from '../ave.service';

@Component({
  selector: 'app-aves',
  templateUrl: './aves.component.html',
  styleUrls: ['./aves.component.scss']
})
export class AvesComponent implements OnInit {
  aves: Ave[];

  constructor(private aveService: AveService) { }
  ngOnInit() {
    this.getAves();
  }

  getAves(): void {
    this.aveService.getAves()
    .subscribe(aves => this.aves = aves);
  }

  add(nombreComun: string, nombreCientifico: string): void {
    nombreComun = nombreComun.trim();
    if (!nombreComun || !nombreCientifico) { return; }
    this.aveService.addAve({ nombreComun } as Ave)
      .subscribe(ave => {
        this.aves.push(ave);
      });
  }

  delete(ave: Ave): void {
    this.aves = this.aves.filter(h => h !== ave);
    this.aveService.deleteAve(ave).subscribe();
  }
}
