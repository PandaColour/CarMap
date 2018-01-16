import {Component} from '@angular/core';
import {ControlAnchor, NavigationControlType, OfflineOptions} from 'angular2-baidu-map';
import {DbService} from './db.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opts: any;
  offlineOpts: OfflineOptions;

  jsession: string;
  vehildno: string;
  mapHeight: string;
  gt: string;
  sp: number;
  ps: string;
  mlat: number;
  mlng: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;

  constructor(private dbServer: DbService, private activatedRoute: ActivatedRoute) {

    this.mapHeight = (window.innerHeight - 20) + 'px';
    this.jsession = null;
    this.vehildno = null;
    this.gt = null;
    this.sp = 0;
    this.ps = null;
    this.mlat = 0;
    this.mlng = 0;
    this.s1 = 0;
    this.s2 = 0;
    this.s3 = 0;
    this.s4 = 0;

    this.opts = null;

    this.activatedRoute.queryParams.subscribe((params) => {
      this.jsession = params['jsession'];
      this.vehildno = params['vehiIdno'];

      if (this.jsession === null) {
        this.jsession = localStorage.getItem('jsession');
      }

      if (this.jsession === null) {
        this.onReLogin();
      } else {
        this.dbServer.getDeviceStatus(this.jsession, this.vehildno)
          .subscribe((data) => {
            if (data['result'] === 0) {
              this.onShowMap(data);
            } else {
              this.onReLogin();
            }
          });
      }
    });
  }

  onReLogin() {
    this.dbServer.login().subscribe((data) => {
      if (data['result'] === 0) {
        this.jsession = data['jsession'];
        localStorage.setItem('jsession', this.jsession);
        this.dbServer.getDeviceStatus(this.jsession, this.vehildno)
          .subscribe((data) => {
            if (data['result'] === 0) {
              this.onShowMap(data);
            } else {
              window.alert('网页错误');
            }
          });
      } else {
        window.alert('网络不通');
      }
    });
  }

  onShowMap(data: any) {
    this.mlat = parseFloat(data['status'][0]['mlat']);
    this.mlng = parseFloat(data['status'][0]['mlng']);

    this.gt = data['status'][0]['gt'];
    this.sp = data['status'][0]['sp'];
    this.ps = data['status'][0]['ps'];
    this.s1 = data['status'][0]['s1'];
    this.s2 = data['status'][0]['s2'];
    this.s3 = data['status'][0]['s3'];
    this.s4 = data['status'][0]['s4'];

    this.opts = {
      center: {
        longitude: this.mlng,
        latitude: this.mlat
      },
      zoom: 17,
      markers: [{
        longitude: this.mlng,
        latitude: this.mlat,
        title: '车牌',
        content: this.vehildno,
        enableDragging: true,
        autoDisplayInfoWindow: true
      }],
      geolocationCtrl: {
        anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
      },
      scaleCtrl: {
        anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
      },
      overviewCtrl: {
        isOpen: true
      },
      navCtrl: {
        type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
      }
    };

    this.offlineOpts = {
      retryInterval: 5000,
      txt: 'NO-NETWORK'
    };
  }

  loadMap(map: any) {
  }

  clickMarker(marker: any) {
  }

  clickmap(e: any) {
  }
}
