import { Component, Input } from '@angular/core';

export type Buttons = Array<{
  text?: string;
  styles?: any;
  icon?: string;
  onClick?: (event: any) => void;
}>;

export interface ListItem {
  title: string;
  dueDate?: string;
  text?: string;
  id: string;
  icon_url?: string;
  styles?: any;
  buttons?: Buttons;
  media?: string;
  design?: {
    template: 'industrial'
  };
  overflowmenu?: {
    buttons: Buttons
  };
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  private _item: ListItem;
  constructor() { }

  @Input()
  set item(item: ListItem) {
    this._item = item;
  }

  get item(): ListItem { return this._item; }

}
