import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../dataservice';
import { ListItem } from '../list-item/list-item.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  minDate: Date;
  maxDate: Date;
  data = {} as ListItem;
  editMode;
  constructor(
    public dialogRef: MatDialogRef<NewComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private service: DataService) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  onNoClick(): void {
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(form): void {
    const data = form.value;
    this.service.add(data);
    this.close();
  }

}
