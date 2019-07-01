import { ElectronService } from 'ngx-electron';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  message: any;
  constructor(private electronService: ElectronService, private ngZone: NgZone) {
    this.electronService.ipcRenderer.send('asynchronous-message', 'message');
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
      this.ngZone.run(() => {
        this.message = arg;
      });
    });
  }
}
