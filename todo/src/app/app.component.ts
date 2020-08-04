import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListItem } from './list-item/list-item.component';
import { EditComponent } from './edit/edit.component';
import { MatDialog } from '@angular/material/dialog';

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
    item.overflowmenu = {
      buttons: [
        {
          text: 'Edit',
          onClick: () => {
            console.log('sdf', index);
            this.items.splice(index, 1);
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
    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  drop($event) {
    console.log('sdf', $event);
  }

}
