import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component'
import { DataRequestService } from 'src/app/services/data-request.service';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  
})
export class TaskComponent implements OnInit{
  @Output()
  indicatorsData = new EventEmitter();
  allTaks:Array<any>  = [];
  create:Array<any> = []
  progress:Array<any> = []
  done:Array<any> = []
  
  constructor(
    public dialog: MatDialog,
    public dataService: DataRequestService,
    private spinner: NgxSpinnerService){
  }

  ngOnInit(): void {
    this.getAlltask()
  }

  
  getAlltask(){
    this.spinner.show()
    this.dataService.getAllTasks().subscribe( (resp: Array<any>) =>{
      setTimeout(() => {
        console.log(resp)
        this.create = resp.filter(c => c.idstatus === 'create')
        this.progress = resp.filter(c => c.idstatus === 'progress')
        this.done = resp.filter(c => c.idstatus === 'done')
        this.allTaks = resp
        this.indicators()
        this.spinner.hide()
      }, 800);
    });
  }

  indicators(){
    const indicator ={
      create: this.create.length,
      progress: this.progress.length,
      done: this.done.length
    } 

    this.dataService.updateData(indicator)
  }

  add(id?: any) {
    this.dialog.open(AddTaskComponent, {
      disableClose: true,
      data: id
    }).afterClosed().subscribe( resp=>{
      if (resp) {
          this.getAlltask()
      }
    });
  }

  deleteTask(item:any){
    console.log(item)
    this.dataService.deleteTask(item._id).subscribe(res =>{
      this.getAlltask()
    });
  }

  updateState(item:any){
    const data ={
      title: item.title,
      description: item.description,
      idstatus: "progress"
    } 
    this.dataService.updateTask(item._id, data).subscribe(resp =>{
      if (resp) {
        this.getAlltask()
      }
    });
  }

  updateDone(item:any){
    const data ={
      title: item.title,
      description: item.description,
      idstatus: "done"
    } 
    this.dataService.updateTask(item._id, data).subscribe(resp =>{
      if (resp) {
        this.getAlltask()
      }
    });
  }
  updateProgress(item:any){
    const data ={
      title: item.title,
      description: item.description,
      idstatus: "progress"
    } 
    this.dataService.updateTask(item._id, data).subscribe(resp =>{
      if (resp) {
        this.getAlltask()
      }
    });
  }

  editTask(item:any){
    console.log(item)
    this.add({status: 'update', item})
  }
}
