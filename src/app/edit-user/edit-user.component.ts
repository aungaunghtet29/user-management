import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  id = this.activateRoute.snapshot.params['id'];
  form: FormGroup;


  constructor(
    private builder: FormBuilder,
    private crud: CrudService,
    public activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required , Validators.email]],
      phone: ['', Validators.required],
    });
  }

  edit() {
    const data = {
      id: this.id,
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
    };

    this.crud.update(this.id, data).subscribe((value) => {
      this.router.navigate(['/users']);
    });
  }

  showError(name: string) {
    return (
      this.form.get(name)?.invalid &&
      (this.form.get(name)?.touched || this.form.get(name)?.dirty)
    );
  }

  fetchData(){
    this.crud.getAllUser().subscribe();
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
