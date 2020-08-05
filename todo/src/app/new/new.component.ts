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
    @Inject(MAT_DIALOG_DATA) public inData, private service: DataService) {
  }

  onNoClick(): void {
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(form): void {
    const task: ListItem = form.value;
    this.service.new(task.title, task.text, task.dueDate);
    this.close();
  }

}
