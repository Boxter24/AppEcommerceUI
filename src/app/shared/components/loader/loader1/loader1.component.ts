import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-loader1',
  templateUrl: './loader1.component.html',
  styleUrls: ['./loader1.component.css']
})
export class Loader1Component implements OnInit {

  /*===== Variables =====*/
  public loader = this.loaderService.loaderState;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
