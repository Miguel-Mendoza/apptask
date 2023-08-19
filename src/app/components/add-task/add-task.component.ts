import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataRequestService } from 'src/app/services/data-request.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  task!: FormGroup;
  dataList =[
    {name:'Ux'},
    {name:'Desarrollo'},
    {name:'Diseño'}
  ]

  constructor(
    private dialog: MatDialog, 
    private fb: FormBuilder, 
    private dataService: DataRequestService, 
    private ref:MatDialogRef<AddTaskComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any){
    console.log(this.data)
    this.formTask()
    this.task.valueChanges.subscribe(res =>{
      console.log(res)
    });

    if(data.status === 'update'){
      this.setForm()
    }
  }

  formTask(){
    this.task = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      idstatus: ['create']
    })
  }

  setForm(){
    this.task.patchValue({
      title: this.data.item.title,
      description: this.data.item.description,
      idstatus: this.data.item.idstatus
    })
  }

  saveTaks(){
    this.spinner.show()
    const formValue = this.task.value;
    this.dataService.createTask(formValue).subscribe(res =>{
      if (res) {
        this.spinner.hide()
        this.ref.close(true)
      }
    });
  }

  updateTaks(){
    this.dataService.updateTask(this.data.item._id, this.task.value).subscribe(resp =>{
      if (resp) {
        this.spinner.hide()
        this.ref.close(true)
      }
    });
  }

  close(){
    this.dialog.closeAll()
  }

}
