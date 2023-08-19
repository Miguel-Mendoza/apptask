import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appTask';

  countChange(event:any){
    setTimeout(() => {
      console.warn(event)
    }, 2000);
  }
}
