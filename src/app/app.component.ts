import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  sources = [] as any[];
  selectedSource;
  videostream;
  @ViewChild('videoElement', { static: true }) videoElement: any;
  video: any;

  title = 'electron-app';
  constructor(private _electronService: ElectronService) { }

  ngOnInit() {
   this.video  =  this.videoElement.nativeElement;
  }

  displaySources() {
    if (this._electronService.isElectronApp) {
      this._electronService.desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {

        // if (error) throw error;
        this.sources = sources;
        if(this.sources.length > 0){
          this.selectedSource = this.sources[0];
        }
      });
    }
  }

  selectSource(source) {
    this.selectedSource = source;
  }

  takeScreenshot() {

    let nav = <any>navigator;

    nav.webkitGetUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: this.selectedSource.id,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        }, (stream) =>{
          this.video.srcObject = stream;
          this.video.onloadedmetadata = (e) => this.video.play()

        }, ()=>{
            console.log('getUserMediaError');
        });
        return;
    }
}
