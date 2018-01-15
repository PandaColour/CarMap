import {Component, ViewChild} from '@angular/core';
import {
  BaiduMapModule,
  BMapInstance, ControlAnchor, MapOptions, MapTypeControlOptions, MapTypeControlType, NavigationControlOptions, NavigationControlType,
  OverviewMapControlOptions, Point,
  ScaleControlOptions
} from 'angular2-baidu-map';
import {DbService} from './db.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options: MapOptions;
  point: Point;
  controlOpts: NavigationControlOptions;
  overviewmapOpts: OverviewMapControlOptions;
  scaleOpts: ScaleControlOptions;
  mapTypeOpts: MapTypeControlOptions;

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
    this.point = null;
    this.options = null;
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

    this.activatedRoute.queryParams.subscribe((params) => {
      this.jsession = params['jsession'];
      this.vehildno = params['vehiIdno'];

      this.dbServer.getDeviceStatus(this.jsession, this.vehildno)
        .subscribe((data) => {
          if (data['result'] === 0) {
            this.mlat = parseFloat(data['status'][0]['mlat']);
            this.mlng = parseFloat(data['status'][0]['mlng']);

            this.point = {
              lat: this.mlat,
              lng: this.mlng
            };

            this.options = {
              centerAndZoom: {
                lat: this.mlat,
                lng: this.mlng,
                zoom: 16
              },
              enableKeyboard: true
            };

            this.gt = data['status'][0]['gt'];
            this.sp = data['status'][0]['sp'];
            this.ps = data['status'][0]['ps'];
            this.s1 = data['status'][0]['s1'];
            this.s2 = data['status'][0]['s2'];
            this.s3 = data['status'][0]['s3'];
            this.s4 = data['status'][0]['s4'];
          }
        });
    });

    this.controlOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
    };

    this.overviewmapOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT,
      isOpen: true
    };

    this.scaleOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
    };

    this.mapTypeOpts = {
      type: MapTypeControlType.BMAP_MAPTYPE_CONTROL_HORIZONTAL
    };
  }

  public onMapLoad(map: BMapInstance) {
    console.log('map loaded', map);
  }

  public onClickMarker(e: any) {
  }

  public onClickMap(e: any) {
  }
}
