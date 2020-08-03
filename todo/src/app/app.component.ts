import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items;
  constructor(private http: HttpClient) {
    this.http.get('https://todo-example.vercel.app/db.json').subscribe(result => {
      this.items = result;
    });
  }
}
