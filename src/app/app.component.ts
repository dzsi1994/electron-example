import { Component } from '@angular/core';
import { NgxElectronModule, ElectronService } from 'ngx-electron';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'electron-angular-demo';
  constructor(private electronService: ElectronService) {}
  launchWindow() {
    this.electronService.shell.openExternal('https://eroticfeel.com');
  }
}
