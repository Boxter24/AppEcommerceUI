import { Component, OnInit } from '@angular/core';
import { faBars, faHouseUser, faUser, faUsers, faBoxes, faLayerGroup, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /*===== Variables =====*/
  openNavside = true;
  faBars = faBars;
  faHouse = faHouseUser;
  faUser = faUser;
  faUsers = faUsers;
  faBoxes = faBoxes;
  faLayerGroup = faLayerGroup;
  faEdit = faShoppingBasket;

  constructor() { }

  ngOnInit(): void {
  }

  open(): void {
    this.openNavside = !this.openNavside
  }

}
