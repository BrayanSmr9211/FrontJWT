import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { Subscription } from 'rxjs';
import { ILogin   } from 'src/app/Interface/ILogin';
import { serviceHTTPService } from 'src/app/services/serviceHTTP.service';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  scrHeight: any;
  scrWidth: any;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private _maService: serviceHTTPService,
    private route: Router
  ) {

    this.formLogin = formBuilder.group({
      IdUser: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnDestroy(): void {
  //  throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.Login;
  }

  Login() {
    debugger
    const usuarioLogin: ILogin = {
      IdUser: this.formLogin.value.IdUser,
      password: this.formLogin.value.password,
      reference : 'TokenWeb',
    };

    debugger
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('Token');
    httpHeaders = httpHeaders.append('Authorization','bearer'+ token);
       this._maService.addM(usuarioLogin, httpHeaders).subscribe(data => {
        debugger
        const token = data.result;
        console.log('token', token);
        if(token == 'No hay data')
        {
          Swal.fire({
            imageUrl: 'src\app\component\Images\error.png',
            imageWidth: 66,
            imageHeight: 59,
            html: `<div class="titulo-error">
                    Error En el login
                   </div>
             <div>
             El usuario o clave erronea - puedes crear un usuario en regitrar
             </div>`,
            grow: 'fullscreen',
            customClass: {
              confirmButton: 'btnprimario intentar-button',
            },
            buttonsStyling: false,
            showCloseButton: true,

          });
          console.log('Error en el login');
        }
        else{
          sessionStorage.setItem('Token',token )
          this.router.navigateByUrl('/list');

        }
      },
        err => {
        console.log('Error en el login', err);
      });
  }

  hasError(nombreControl: string, validacion: string) {
    const control = this.formLogin.get(nombreControl);
    //return control.hasError(validacion);
  }
}


