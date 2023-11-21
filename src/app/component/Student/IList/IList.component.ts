import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import{ ServicesNet} from 'src/app/Interface/InterfaceServ'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serviceHTTPService } from 'src/app/services/serviceHTTP.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {MatPaginatorModule} from '@angular/material/paginator';

interface ArrayEstu {
  id : Int16ArrayConstructor[],
}

@Component({
  selector: 'app-IList',
  templateUrl: './IList.component.html',
  styleUrls: ['./IList.component.css'],
})
export class IListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Name', 'Gender','Identification','Companyposition', 'DateC', 'Active',  'Action'];
  headers = new HttpHeaders();
  listM: any[] = [];
  ArrayMat: ArrayEstu[] =  this.listM;
  dataSource = new MatTableDataSource<ServicesNet>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar,
            private _maService:serviceHTTPService,
            private http: HttpClient,
            private sanitizer: DomSanitizer)
            {
              this.headers.append("Content-Type", "application/json");
            }


  ngOnInit(): void {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('Token');
    httpHeaders = httpHeaders.append('Authorization','Bearer '+ token);

    debugger
    this.loading = true;

    this._maService.get(httpHeaders)
    .subscribe(data => {
      this.dataSource.data = data;
      debugger
      console.log(data)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items per pag'
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GetL() {
   debugger
    this.loading = true;
    this._maService.get(this.headers)
    .subscribe(data => {
      this.dataSource.data = data;
      debugger
      console.log(data)
    })
    debugger
  }

  DeleteM(id: number) {
    debugger
    this.loading = true;
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('Token');
    httpHeaders = httpHeaders.append('Authorization','Bearer '+ token);
    this._maService.delete(id,"User/", httpHeaders).subscribe(data => {
        debugger
        this._snackBar.open('Delete Was OK','', {
          duration: 9000,
          horizontalPosition: 'right',
        });
        this.GetL();
        debugger

    });
  }
  Messok() {
    this._snackBar.open('OK','', {
      duration: 9000,
      horizontalPosition: 'right',
    });
  }
  AddL(DataDB: ServicesNet) {
    debugger
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('Token');
    httpHeaders = httpHeaders.append('Authorization','Bearer '+ token);
      this._maService.addM(DataDB,httpHeaders).subscribe(data => {
        this.Messok;
      })
  }
  DownloadFiel(Id: number)
  {
    const token = sessionStorage.getItem('Token');
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
   });

    this.loading = true;
      this._maService.getId(Id,reqHeader).subscribe(data => {
        debugger
        console.log(data);
        var datajson =  JSON.stringify(data)
        const blob = new Blob([datajson], { type: 'text/csv' });
        const url= window.URL.createObjectURL(blob);
        window.open(url);
      })
  }
  DownloadFielall()
  {
    debugger
    const token = sessionStorage.getItem('Token');
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
   });

    this.loading = true;
      this._maService.get(reqHeader).subscribe(data => {
        debugger
        console.log(data);
        var datajson =  JSON.stringify(data)
        const blob = new Blob([datajson], { type: 'text/csv' });
        const url= window.URL.createObjectURL(blob);
        window.open(url);

      })
    }
}
