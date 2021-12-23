import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Headline } from '../headline';
import { NewsHeadlinesComponent } from '../news-headlines/news-headlines.component';

@Component({
  selector: 'nfl',
  templateUrl: './nfl.component.html',
  styleUrls: ['./nfl.component.scss']
})
export class NflComponent implements OnInit {
  sportQuery = 'nfl'
  headline:any = {}
  // @ViewChild(NewsHeadlinesComponent) child!:NewsHeadlinesComponent

  // @ViewChild(NewsHeadlinesComponent)
  //      private child = {} as NewsHeadlinesComponent;

  constructor() { 
  }

  ngOnInit(
  ): void {
    
    // this.child.sendNewsItem()
  }

  // ngAfterViewInit() {
  //   // child is set
  //   this.headline = this.child.getNews('nfl')
  //   console.log(this.headline)
  // }

  

  getHeadline($event:Headline) {
    this.headline = $event
  }

}
