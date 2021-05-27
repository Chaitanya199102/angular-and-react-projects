import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageService } from '../../services/manage.service';
import { flatMap, takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-actions-add',
  templateUrl: './actions-add.component.html',
  styleUrls: ['./actions-add.component.scss']
})
export class ActionsAddComponent implements OnInit, OnDestroy {

  view: any[];
  entity: any;
  url: any;
  constructor(private manageService: ManageService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.pipe(
      takeUntil(componentDestroyed(this)),
      flatMap(params => {
        console.log('params.entity', params.entity);
        return this.manageService.getEntityViews(params.entity);
      })
    ).subscribe(view => {
        this.view = view._embedded.entityViews;
        console.log(this.view);
    });
  }

  generateForm() {
    // TO DO
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (uploadEvent: ProgressEvent) => {
        this.url = (<FileReader>uploadEvent.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnDestroy() {
    // no implementation needed
  }

}
