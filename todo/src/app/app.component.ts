import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListItem } from './list-item/list-item.component';
import { EditComponent } from './edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from './new/new.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items;
  constructor(private http: HttpClient, public dialog: MatDialog) {

    const url = 'https://todo-example-server.vercel.app/db.json';

    this.http.get(url).subscribe((result: Array<ListItem>) => {
      this.items = result.map((item, index) => this.mappedItem(item, index));
    });
  }

  mappedItem = (item: ListItem, index: number): ListItem => {
    // @ts-ignore
    item.text = item.description;
    // @ts-ignore
    item.subTitle = item.due_date;
    item.overflowmenu = {
      buttons: [
        {
          text: 'Edit',
          onClick: () => {
            this.dialog.open(EditComponent, {
              width: '250px',
              data: this.items[index]
            });
          }
        },
        {
          text: 'Delete',
          onClick: () => {
            console.log('sdf', index);
            this.items.splice(index, 1);
          }
        }
      ]
    };
    return item;
  }

  newTask() {
    this.dialog.open(NewComponent, {
      width: '250px',
      data: {}
    });
  }

  drop($event) {
    console.log('sdf', $event);
  }

}
