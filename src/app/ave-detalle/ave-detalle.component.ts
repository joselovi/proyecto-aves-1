import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Ave } from '../ave';
import { AveService } from '../ave.service';

@Component({
  selector: 'app-ave-detalle',
  templateUrl: './ave-detalle.component.html',
  styleUrls: ['./ave-detalle.component.scss']
})
export class AveDetalleComponent implements OnInit {
  ave: Ave;

  constructor(
    private route: ActivatedRoute,
    private aveService: AveService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAve();
  }

  getAve(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.aveService.getAve(id)
      .subscribe(ave => this.ave = ave);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.aveService.updateAve(this.ave)
      .subscribe(() => this.goBack());
  }
}
