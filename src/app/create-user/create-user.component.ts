import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

//crud https://bezkoder.com/angular-11-crud-app/
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private crud: CrudService,
    private router : Router
  ) {
    this.form = builder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
    });
  }

  showError(name: string) {
    return (
      this.form.get(name)?.invalid &&
      (this.form.get(name)?.touched || this.form.get(name)?.dirty)
    );
  }

  formReset() {
    this.form.reset();
  }

  formSubmit() {
    /*
    var formData : any = new FormData();

    formData.append(
      'name' ,this.form.get('name')?.value
    )
    formData.append(
      'email' ,this.form.get('email')?.value
    )
    formData.append(
      'phone' ,this.form.get('phone')?.value
    )

    */
    const data = {
      id: 0,
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
    };
    return this.crud.create(data).subscribe(
      value => {
        this.router.navigate(['/users'])
      }
    );

  }


  ngOnInit(): void {}
}
