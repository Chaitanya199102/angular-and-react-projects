import { Component, OnInit } from '@angular/core';
import { ManageService } from '../services/manage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-side-nav',
  templateUrl: './manage-side-nav.component.html',
  styleUrls: ['./manage-side-nav.component.scss']
})
export class ManageSideNavComponent implements OnInit {

  constructor(private manageService: ManageService,
    private route: ActivatedRoute,
    private router: Router) { }
  managableEntities: any[];
  ngOnInit() {
    this.getEntities();
  }

  getEntities() {
    this.manageService.getEntities()
      .subscribe(
        entitiesInfo => {
          console.log('entitiesInfo', entitiesInfo);
          this.managableEntities = entitiesInfo;
        },
        error => console.log(error)
      );
  }

  navigateTo(routePath: string) {
    console.log('routePath', routePath);
    this.router.navigate(['manage-information', { outlets: { manage: [routePath] } }]);
  }


}
