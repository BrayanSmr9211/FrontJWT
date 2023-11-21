import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesNet } from 'src/app/Interface/InterfaceServ';
import { serviceHTTPService } from 'src/app/services/serviceHTTP.service';
import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { EmptyExpr } from '@angular/compiler';
import { isEmpty } from 'rxjs';

interface Arraydata2{
  Id : String,
  Code: String
}

@Component({
  selector: 'app-Add-Edit',
  templateUrl: './Add-Edit.component.html',
  styleUrls: ['./Add-Edit.component.css']

})

export class AddEditComponent implements OnInit {
  list: any[] = [];
  operacion: string = 'ADD';
  loading: boolean = false;
  form : FormGroup;
  Id: number;
  Now= new Date(Date.now());
  operation: string = 'Add';
  headers = new HttpHeaders();

  //Envio de la INf al html
   ArrayH: Arraydata2[] = [
    {Id: '1', Code: 'Famale'},
    {Id: '2', Code: 'Male'},
    {Id: '3', Code: 'Prefer do no say'},
   ];
   ArrayH2: Arraydata2[] = [
    {Id: '1', Code:"true"},
    {Id: '2', Code: "false"},
   ];

  constructor(private fb: FormBuilder,
    private _maService: serviceHTTPService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute,
    private datePipe: DatePipe
    ) {

    //validaciones
    this.form = this.fb.group({
      Name: ['', Validators.required],
      Datec: ['', Validators.required],
      Identification : ['', Validators.required],
      Gender : ['', Validators.required],
      Email : ['', Validators.required, Validators.email],
      Active : ['', Validators.required],
      Companyposition : ['', Validators.required],
    })
    this.Id = Number(this.aRoute.snapshot.paramMap.get('Id'));
  }

  ngOnInit(): void {
debugger
    if(this.Id != 0) {
      this.operacion = 'Edit';
      this.GetM(this.Id)
    }
    else{this.GetS()}
  }
  GetS() {
    debugger
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization','bearer'+ token);

    this.loading = true;


  }

  GetM(Id: number){
    debugger
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('Token');
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
   });

    this.loading = true;
      this._maService.getId(Id,reqHeader).subscribe(data => {
        debugger
        console.log(data);

        this.form.patchValue ({
          Name: data[0].Name,
          Datec : data[0].DateC,
          Identification:data[0].Identification,
          Gender : data[0].Gender,
          Email: data[0].Email,
          Active : data[0].Active,
          Companyposition:data[0].Companyposition,
        })
      })

  }
  AddEdit() {
    debugger
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('Token');
    if (token)
    {
      httpHeaders = httpHeaders.append('Authorization','bearer'+ token);

      var year = this.form.value.Datec.toLocaleString("default", { year: "numeric" });
      var month = this.form.value.Datec.toLocaleString("default", { month: "2-digit" });
      var day = this.form.value.Datec.toLocaleString("default", { day: "2-digit" });
      const DataDB: ServicesNet = {
        reference : 'User',
        Id : 1,
        Name :this.form.value.Name,
        datec:  (year + "-" + month + "-" + day),
        Identification:this.form.value.Identification,
        Companyposition: this.form.value.Companyposition,
        Active: this.form.value.Active,
        Gender: this.form.value.Gender,
        Email : this.form.value.Email,
        Phone :12
      }
      console.log(DataDB);
  debugger
      if(this.Id != 0) {
        DataDB.datec= this.form.value.Fecha;
        DataDB.Id= this.Id;
        this.editM(this.Id, DataDB);
      } else {
        this.AddL(DataDB);
      }
    }
    else{
      var year = this.form.value.Datec.toLocaleString("default", { year: "numeric" });
      var month = this.form.value.Datec.toLocaleString("default", { month: "2-digit" });
      var day = this.form.value.Datec.toLocaleString("default", { day: "2-digit" });
      const DataDB: ServicesNet = {
        reference : 'TokenWeb/RegisterUser/',
        Id : 1,
        Name :this.form.value.Name,
        datec:  (year + "-" + month + "-" + day),
        Identification:this.form.value.Identification,
        Companyposition: this.form.value.Companyposition,
        Active: this.form.value.Active,
        Gender: this.form.value.Gender,
        Email : this.form.value.Email,
        Phone: 123
      }
      console.log(DataDB);
  debugger
      if(this.Id != 0) {
        DataDB.datec= this.form.value.Fecha;
        DataDB.Id= this.Id;
        this.editM(this.Id, DataDB);
      } else {
        this.AddL(DataDB);
      }
    }

  }

  editM(id: number, DataDB: ServicesNet) {
    debugger
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('Token');
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
   });

    this.loading = true;
    this._maService.update(id, DataDB,reqHeader).subscribe(() => {
      this.loading = false;
      console.log('llegue')
      this.MensOk('update');
      this.router.navigate(['/list']);
    })
  }

  AddL(DataDB: ServicesNet) {
    debugger
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('Token');
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
   });

       this._maService.addM(DataDB,reqHeader).subscribe(data => {
        debugger
        console.log(data);
        if(data == null )
        {
          this.MensOk('Add');

          if (token)
          {
             this.router.navigate(['/list']);
          }
          else
          {
            this.router.navigate(['/Login']);
          }

        }
        if(data != null )
        {
          this.MensOk('Add');
        }


      })
  }

  MensOk(texto: string) {
    debugger
    this._snackBar.open(`The user was  ${texto} ok`,'', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

  MensError(texto: string) {
    debugger
    this._snackBar.open(`we have a problem with the service, try later  ${texto}`,'', {
      duration: 8000,
      horizontalPosition: 'right',
    });
  }

}
