import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.css']
})
export class NoPageFoundComponent implements OnInit {

  router:any
  url:string 
  constructor(private _router: Router) { 
    this.router = _router;
    this.url = '---';
  }

  ngOnInit(): void {
    this.url = this.router.url;    
    
  }

}
