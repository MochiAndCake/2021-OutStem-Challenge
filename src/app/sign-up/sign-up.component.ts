import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

//import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  submitAttempt: Boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitAttempt = false;
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      checkbox: [null, Validators.required]
    })
  }

  isFieldInvalid(fld: string) {
    return !this.form.get(fld).valid && this.submitAttempt;
    //(!this.form.get(fld).valid && this.form.get(fld).touched) || (this.form.get(fld).untouched && this.submitAttempt);
  }

  showError(fld: string) {
    return{
      'error': this.isFieldInvalid(fld)
    };
  }

  onSubmit() {
    this.submitAttempt = true;
    if(this.form.valid){
      this.submitAttempt = false;
      this.form.reset();
      // If form invalid, loop through each field
      // Retrieve control object as we iterate.
      // Mark control as touched to trigger validation.
      // Learned from: https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/#displaying-the-validation-error-message
      // Object.keys(this.form.controls).forEach(fld => {
      //   const control = this.form.get(fld);
      //   control.markAsTouched({ onlySelf: true});
      // });
    }
  }
}
