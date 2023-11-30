import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  inputValue!: string;
  myForm: FormGroup;
  userName!: string;

  // create a form
  constructor(private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      key: ['', [Validators.required]]
    });
  }

  // handle submit event of form
  onSubmit() {
    try{
      if (this.myForm.valid) {
        // get userName
        this.userName = this.myForm.value.key;
        // navigate to userPage by passing userName as a parameter
        this.router.navigate([`/user/${this.userName}`]);
      }
    }catch(error: any){
      throw(error);
    }
  }

}
