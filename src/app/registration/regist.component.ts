import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})

export class RegistComponent {
  logo!: File;
  password!: string;
  confirmPassword ! :string;
  passwordMatch ! :boolean;


  constructor( private formBuilder : FormBuilder,private registrationService : RegistrationService,
    private router : Router){}
registrationForm = this.formBuilder.group({
  businessName :[null,[Validators.required,Validators.minLength(4)]],
  // businessLogo :[''],
  typeOfBusiness :[null,Validators.required],
  email : [null,[Validators.required,Validators.email]],
  contactpersonName:[null,Validators.required],
  address :[null,Validators.required],
  password :[null,Validators.required],
  confirmPassword :[null,Validators.required]
})

checkPassword() {
  if (this.password ===  this.confirmPassword){
    return this.passwordMatch = false;
  }else {
    return this.passwordMatch = true;
  }

    }

onFileSave( event : any){
  this.logo = event.target.files[0];
}
register (){
  const registratinFormData = this.registrationForm.value;
  // console.log(registratinFormData);
  const formData :FormData = new FormData(); 

    formData.append('logoFile', this.logo);
  
  formData.append('businessName',this.registrationForm.get('businessName')?.getRawValue());
  formData.append('businessType',this.registrationForm.get('typeOfBusiness')?.getRawValue());
  formData.append('emailId',this.registrationForm.get('email')?.getRawValue());
  formData.append('contactpersonName',this.registrationForm.get('contactpersonName')?.getRawValue())
  formData.append('address',this.registrationForm.get('address')?.getRawValue())
  formData.append('password',this.registrationForm.get('password')?.getRawValue());
  this.registrationService.saveRegistration(formData).subscribe( response => {console.log(response)},
   error =>{
  console.log(error)}
  );
  setTimeout( () =>
  this.router.navigate(['/']),2000)
}

}
