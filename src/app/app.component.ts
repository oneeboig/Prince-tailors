import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UserService } from './services/user.service';
import { User } from './services/user.interface';
import { DBoperations } from './services/dboperations';
import { Match } from './services/match';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'api_crud';
  registerform: FormGroup;
  data: User[] = [];
  submitted: boolean = false;
  buttontext: string = 'submit';
  dbops: DBoperations
  constructor(private toastr: ToastrService, private fb: FormBuilder, private userserice: UserService) {
  }
  ngOnInit() {
    this.setformstate();
    this.getallusers();
  }
  setformstate() {
    this.buttontext = "Submit"
    this.dbops = DBoperations.creat;
    this.registerform = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dob: ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{4})-(\d{2})-(\d{2})$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required],
      Acceptterm: [false, Validators.required],

    },{
      validators : Match('password','confirmPassword')
    });
  }
  get f(){
    return this.registerform.controls;
  }
  onsubmit() {
    this.submitted = true;
    console.log(this.dbops)
    if (this.registerform.invalid) {
      return;
    }
    console.log(this.dbops)
    switch (this.dbops) {
      
      case DBoperations.creat:
        this.userserice.adduser(this.registerform.value).subscribe(res=>{

        })
        this.toastr.success("User add successfully","User Registration")
        this.getallusers();
        this.cancel();
        break;
      case DBoperations.update:
        this.userserice.updateuser(this.registerform.value).subscribe(res=>{

        })
        this.toastr.success("User add successfully","User Registration")
        this.getallusers();
        this.cancel();
        break;
    }


  }
  cancel() {
    this.registerform.reset();
    this.buttontext = "Submit"
    this.dbops = DBoperations.creat;
    this.submitted = false;
  }
  getallusers() {
    this.userserice.getusers().subscribe((res: User[]) => {
      this.data = res;
    })
  }
  update(id: number) {
    this.buttontext = "Update"
    this.dbops = DBoperations.update;
    let uservalue = this.data.find((u: User)=>u.id === id);
    this.registerform.patchValue(uservalue)
    this.registerform.get('password').setValue('');
    this.registerform.get('confirmPassword').setValue('');
    this.registerform.get('Acceptterm').setValue(false);
  }
  delete(id: number) {
    this.userserice.deleteuser(id).subscribe(res => {
      this.getallusers();
      this.toastr.success("Deleted successfully", "User registrations")
    })
  }
}
