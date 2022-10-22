import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { CarDTO } from '../../models/car-dto';
import { CarSearchCriteria } from '../../models/car-search-criteria';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  @ViewChild(PaginationComponent) paginationComponent: PaginationComponent;
  carSearchCrieria: CarSearchCriteria = new CarSearchCriteria();
  carList: Array<CarDTO>;
  showFilterControls: boolean = false;
  total: number;
  pageTitle: string;
  constructor(private carService: CarService,
    private translate: TranslateService) { }
  ngOnInit(): void {
    this.search();
  }
  search() {
    this.carService.getAll(this.carSearchCrieria).subscribe((res: any) => {
      this.carList = res.list;
      this.total = res.total;
      if (this.paginationComponent) {
        this.paginationComponent.totalRecordsCount = this.total;
        this.paginationComponent.setPagination(this.carSearchCrieria.page);
      }
    });
  }
	toggleFilter() {
		this.showFilterControls = !this.showFilterControls;
	}
	onPageChange(event: any) {
		this.carSearchCrieria.page = event;
		this.search();
	}
}
