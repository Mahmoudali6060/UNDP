import { DatePipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CarRequestStatusEnum } from 'src/app/shared/enums/car-request-status.enum';
import { CarRequestSearchCriteriaDTO } from '../../fleet-management/models/car-request-search-criteria.dto';
import { CarRequestTotalDetails } from '../../fleet-management/models/car-request-total-details';
import { CarRequestDTO } from '../../fleet-management/models/car-request.dto';
import { CarRequestService } from '../../fleet-management/services/car-request.service';
import { UserProfileSearchCriteriaDTO } from '../../user/models/user-list-search-criteria-dto';
import { UserProfileService } from '../../user/services/user.service';
declare var jQuery: any;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
	searchCriteriaDTO:UserProfileSearchCriteriaDTO = new UserProfileSearchCriteriaDTO();
	carRequestSearchCrieria:CarRequestSearchCriteriaDTO = new CarRequestSearchCriteriaDTO();
	totalUsers: any;
	totalRequests: number;
	carRequestList: any;
	carRequestStatusEnum :any
	approvedRequest: number;
	inProgressRequest: number;
	ClosedRequest: number;
	carRequestTotalDetails:CarRequestTotalDetails
	constructor(private userProfileService:UserProfileService,private carRequestService:CarRequestService,
		private datepipe: DatePipe) {

	}

	dashboard(model: any) {

	}

	ngOnInit() {
		this.carRequestStatusEnum = CarRequestStatusEnum
		this.carRequestTotalDetails = new CarRequestTotalDetails()
		this.getAllUsers();
		this.getAllCarRequests();
		this.getAllCarRequestsTotalDetails();
		// $(function () {
		// 	var data, options;

		// 	// headline charts
		// 	data = {
		// 		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		// 		series: [
		// 			[23, 29, 24, 40, 25, 24, 35],
		// 			[14, 25, 18, 34, 29, 38, 44],
		// 		]
		// 	};

		// 	options = {
		// 		height: 300,
		// 		showArea: true,
		// 		showLine: false,
		// 		showPoint: false,
		// 		fullWidth: true,
		// 		axisX: {
		// 			showGrid: false
		// 		},
		// 		lineSmooth: false,
		// 	};

		// 	new Chartist.Line('#headline-chart', data, options);


		// 	// visits trend charts
		// 	data = {
		// 		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		// 		series: [{
		// 			name: 'series-real',
		// 			data: [200, 380, 350, 320, 410, 450, 570, 400, 555, 620, 750, 900],
		// 		}, {
		// 			name: 'series-projection',
		// 			data: [240, 350, 360, 380, 400, 450, 480, 523, 555, 600, 700, 800],
		// 		}]
		// 	};

		// 	options = {
		// 		fullWidth: true,
		// 		lineSmooth: false,
		// 		height: "270px",
		// 		low: 0,
		// 		high: 'auto',
		// 		series: {
		// 			'series-projection': {
		// 				showArea: true,
		// 				showPoint: false,
		// 				showLine: false
		// 			},
		// 		},
		// 		axisX: {
		// 			showGrid: false,

		// 		},
		// 		axisY: {
		// 			showGrid: false,
		// 			onlyInteger: true,
		// 			offset: 0,
		// 		},
		// 		chartPadding: {
		// 			left: 20,
		// 			right: 20
		// 		}
		// 	};

		// 	new Chartist.Line('#visits-trends-chart', data, options);


		// 	// visits chart
		// 	data = {
		// 		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		// 		series: [
		// 			[6384, 6342, 5437, 2764, 3958, 5068, 7654]
		// 		]
		// 	};

		// 	options = {
		// 		height: 300,
		// 		axisX: {
		// 			showGrid: false
		// 		},
		// 	};

		// 	new Chartist.Bar('#visits-chart', data, options);

		// 	// real-time pie chart
		// 	var sysLoad = $('#system-load').easyPieChart({
		// 		size: 130,
		// 		barColor: function (percent) {
		// 			return "rgb(" + Math.round(200 * percent / 100) + ", " + Math.round(200 * (1.1 - percent / 100)) + ", 0)";
		// 		},
		// 		trackColor: 'rgba(245, 245, 245, 0.8)',
		// 		scaleColor: false,
		// 		lineWidth: 5,
		// 		lineCap: "square",
		// 		animate: 800
		// 	});

		// 	var updateInterval = 3000; // in milliseconds

		// 	setInterval(function () {
		// 		var randomVal;
		// 		randomVal = getRandomInt(0, 100);

		// 		sysLoad.data('easyPieChart').update(randomVal);
		// 		sysLoad.find('.percent').text(randomVal);
		// 	}, updateInterval);

		// 	function getRandomInt(min, max) {
		// 		return Math.floor(Math.random() * (max - min + 1)) + min;
		// 	}

		// });
	}
	getAllUsers() {
		this.userProfileService.getAll(this.searchCriteriaDTO).subscribe((res: any) => {
			this.totalUsers = res.total;
		});
	}
	getAllCarRequests() {
		this.carRequestService.getAll(this.carRequestSearchCrieria).subscribe((res: any) => {
			this.carRequestList = res.list;
			this.totalRequests = res.total;
			if(res.list){
				this.inProgressRequest = this.carRequestList[0].totalInProgress
				this.approvedRequest = this.carRequestList[0].totalApproved
				this.ClosedRequest = this.carRequestList[0].totalClosed
			}
		});
	}
	getAllCarRequestsTotalDetails(){
		this.carRequestService.getAllCarRequestTotalDetails().subscribe(res=>{
			this.carRequestTotalDetails = res
		})
	}
	onPageChange(event: any) {
		this.carRequestSearchCrieria.page = event;
		this.getAllCarRequests();
		this.getAllCarRequestsTotalDetails();
	}
}
