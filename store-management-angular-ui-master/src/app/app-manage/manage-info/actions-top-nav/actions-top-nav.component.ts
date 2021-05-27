import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-actions-top-nav',
  templateUrl: './actions-top-nav.component.html',
  styleUrls: ['./actions-top-nav.component.scss']
})
export class ActionsTopNavComponent implements OnInit {

  entity: string;
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.entity = params.entity;
    });
  }

  navigateTo() {
    this.router.navigate([{ outlets: { manageAction: ['add-info', this.entity] }}], { relativeTo: this.route });
  }

}
