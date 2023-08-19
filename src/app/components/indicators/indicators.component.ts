import { Component } from '@angular/core';
import { DataRequestService } from 'src/app/services/data-request.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent {
create = 0;
progress = 0;
done = 0
  constructor(private dataService: DataRequestService){
    this.dataService.data.subscribe( (resp:any)=>{
      this.create = resp.create;
      this.progress = resp.progress;
      this.done = resp.done
    });
  }
}
