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
  constructor(public dialog: MatDialog, private service: DataService) {

    service.onDataSubject.subscribe(list => {
      if (!list) {
        return;
      }
      this.items = list.map(e => Object.assign({}, e)).map((item, index) => this.mappedItem(item, index));
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

  drop($event): void { this.service.move($event.previousIndex, $event.currentIndex); }

}
