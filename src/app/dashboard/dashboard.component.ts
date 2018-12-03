import { Component, OnInit } from '@angular/core';
import { Ave } from '../ave';
import { AveService } from '../ave.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  aves: Ave[] = [];

  constructor(private aveService: AveService) { }

  ngOnInit() {
    this.getAves();
  }

  getAves(): void {
    this.aveService.getAves()
      .subscribe(aves => this.aves = aves.slice(1, 5));
  }
}
