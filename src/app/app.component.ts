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

  constructor(private dbServer: DbService, private activatedRoute: ActivatedRoute) {
    this.point = null;
    this.options = null;
    this.jsession = null;
    this.vehildno = null;

    this.activatedRoute.queryParams.subscribe((params) => {
      this.jsession = params['jsession'];
      this.vehildno = params['vehiIdno'];

      this.dbServer.getDeviceStatus(this.jsession, this.vehildno)
        .subscribe((data) => {
          if (data['result'] === 0) {
            const mlat = data['status'][0]['mlat'];
            const mlng = data['status'][0]['mlng'];

            this.point = {
              lat: mlat,
              lng: mlng
            };

            this.options = {
              centerAndZoom: {
                lat: mlat,
                lng: mlng,
                zoom: 16
              },
              enableKeyboard: true
            };
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
