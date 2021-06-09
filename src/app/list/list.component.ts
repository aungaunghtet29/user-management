import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { User } from '../model/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  Users: any = [];

  now : number= Date.now();
  constructor(private crud: CrudService) {}
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    return this.crud.getAllUser().subscribe((data: {}) => {
      this.Users = data;
    });
  }

  remove(id: number) {
    if (window.confirm('Are you sure to delete this data ? ')) {
      this.crud.delete(id).subscribe((res) => this.fetchData());
    }
  }
}
