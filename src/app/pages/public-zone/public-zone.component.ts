import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-public-zone',
  templateUrl: './public-zone.component.html',
  styleUrls: ['./public-zone.component.css']
})
export class PublicZoneComponent implements OnInit {

  // currentLang = "en";  
  constructor(private tranService: TranslateService) { }

  ngOnInit() {

  }

  // changeLang(){
  //   this.tranService.use(this.currentLang);
  //   this.currentLang = this.currentLang=="en"?"th":"en";
  //   console.log(this.currentLang);
    
  // }
}
