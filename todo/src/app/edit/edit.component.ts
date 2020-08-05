import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListItem } from '../list-item/list-item.component';
import { DataService } from '../dataservice';

@Component({
  selector: 'app-edit',
  templateUrl: '../new/new.component.html',
  styleUrls: ['../new/new.component.scss']
})
export class EditComponent {
  editMode;
  data = {} as ListItem;
  constructor(public dialogRef: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) public inData,
    private service: DataService) {
    if (inData) {
      this.editMode = true;
      this.data = inData;
    }
  }

  onNoClick(): void { this.close(); }

  close(): void { this.dialogRef.close(); }

  onSubmit(form): void {
    const task = form.value;
    this.service.update({
      title: task.title,
      text: task.text,
      id: this.data.id,
      dueDate: task.dueDate
    });
  }

}

