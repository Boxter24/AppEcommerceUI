import { Type } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatHeaderCellDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { faPlus, faTrash, faEdit, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { findElement } from 'src/app/shared/utils/jsons/data.crud.json';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit{

  /*===== Variables =====*/
  dataArray$?: Observable<Type[] |null>;
  dataArrayRelation$?: Type[] |null;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  dataCrud?: any;
  titleSingular: string = "";
  //Implicit Column in Datatable
  displayedColumns: string[] = ['id'];
  nameRelation?: string;
  dataSource!: MatTableDataSource<Type[] |null>;
  route: String  = '';
  id: number = 0;
  singular: string = '';
  cont: number = 0;
  
  @ViewChild(MatHeaderCellDef) header!: MatHeaderCellDef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatInput) filter!: MatInput;

  constructor(
    private _dataArrayervice: CrudService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    // this.router.events.subscribe((value) => {
    // //   if(this.table != undefined){
    // //     console.log("a")
    // //     this.table.nativeElement.remove()
      //Get Data
      // this.dataArray$ = this._dataArrayervice.dataArray$;
      // //Get name route active
      // this.route = this.router.url.replace('/dashboard/list/','');
      // //Get data module
      // this.dataCrud = findElement(this.route)!.headerDatatable;
      // this.dataCrud.forEach((text: string) => {
      //   this.displayedColumns.push(text)
      // })
      // //Implicit Column in Datatable
      // this.displayedColumns.push('actions');
      // this.singular = findElement(this.route)!.singular;
    // });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(this.filter){
          this.filter!.value = "";
        }

        this.displayedColumns = ['id'];

        this.dataArray$ = this._dataArrayervice.dataArray$;
        //Get name route active
        this.route = this.router.url.replace('/dashboard/list/','');

        if(findElement(this.route)?.relation){
          this.dataArrayRelation$ = this._dataArrayervice.dataArrayRelation$;
        }

        this.titleSingular = findElement(this.route)!.singular;
        //Get data module
        this.dataCrud = findElement(this.route)!.headerDatatable;
        this.dataCrud.forEach((text: string) => {
            this.displayedColumns.push(text)
        })
        //Implicit Column in Datatable
        this.displayedColumns.push('actions');
        this.singular = findElement(this.route)!.singular;
        this.initDatatable();
      }
    )
  }

  //Init Paginator Datatable later, the Paginator does not work in OnInit
  ngAfterViewInit(): void {
    this.initDatatable();
  }

  //Modal Create
  openDialogCreate(accion: string): void {
    this.dialog.open(ModalComponent,{
      width: '500px',
      data: {
        url: this.route,
        accion: accion,
        relation: this.dataArrayRelation$
      }
    });
  }

  //Modal Edit
  openDialogEdit(accion: string, data: any): void {
    this.dialog.open(ModalComponent,{
      width: '500px',
      data: {
        url: this.route,
        accion: accion,
        edit: data,
        relation: this.dataArrayRelation$
      }
    });
  }

  //Delete Element
  deleteElement(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._dataArrayervice.deleteElement(id).subscribe({
          complete: () => {
            Swal.fire(
              this.titleSingular + ' Delete',
              this.titleSingular + '  deleted successfully!!',
              'success'
            )
          },
          error: () => {
            Swal.fire(
              'Error',
              'An error has occurred',
              'error'
            )
          },
        });
      }
    })
  }
  //Find Element in Datatable
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  

  initDatatable(): void {
    this.dataArray$!.subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  //Select Data row
  findData(row: any, data: string): string {
    this.nameRelation = findElement(this.route)?.nameRelation?.find((e) => e.key == data)?.name;

    if(this.nameRelation){
      return row[data][this.nameRelation!];
    }

    return row[data];
  }

}
