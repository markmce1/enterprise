import { Component,  OnInit, OnDestroy } from '@angular/core'; 
import { PostsService } from '../posts.service';
import { Airbnb } from '../start.model';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {


  listings: Airbnb[] = [];
  private postsSub: Subscription;
  
  constructor(private postsService: PostsService) { }
  ngOnInit() {
    this.postsService.getListings();
    this.postsSub = this.postsService.getListingUpdateListener()
      .subscribe((posts: Airbnb[]) => {
        this.listings = posts;
      });
  }

  onDelete(listingId: string)
  {
    this.postsService.deleteListing(listingId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
