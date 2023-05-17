import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  responseData !: any;


  constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService) { }

  loginForm = this.formBuilder.group({
    businessId: [null, Validators.required],
    password: [null,  [Validators.required, Validators.minLength(3)]]
  });


  ngOnInit(): void {

  }

  login() {
    const formData = this.loginForm.value;
    console.log(formData)
;  
    this.loginService.saveLogin(formData as unknown as Login).subscribe(
      (response: any) => {
        console.log(response);
  
        if (response.message === 'Login successful') {
          this.router.navigate(['/cart']);
        } 
      },
      error => {
        console.error(error);
      
      }
    );
  }
  


  



}
