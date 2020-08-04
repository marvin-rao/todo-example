import { Component } from '@angular/core';
import { ListItem } from './list-item/list-item.component';
import { EditComponent } from './edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { NewComponent } from './new/new.component';
import { DataService } from './dataservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items;
  constructor(public dialog: MatDialog, service: DataService) {

    service.onDataSubject.subscribe(list => {
      this.items = list.map((item, index) => this.mappedItem(item, index));
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
              width: '450px',
              data: this.items[index]
            });
          }
        },
        {
          text: 'Delete',
          onClick: () => {
            this.items.splice(index, 1);
          }
        }
      ]
    };
    return item;
  }

  newTask(): void {
    this.dialog.open(NewComponent, {
      width: '450px',
      data: null
    });
  }

  drop($event): void {

  }

}
