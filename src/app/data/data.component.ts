import { Component,  OnInit, OnDestroy } from '@angular/core'; 
import { ListingsService } from '../listings.service';
import { Airbnb } from '../start.model';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {


  listings: Airbnb[] = [];
  private listingsSub: Subscription;
  isloading = false;
  
  constructor(private listingsService: ListingsService) { }
  ngOnInit() {
    this.isloading = true;
    this.listingsService.getListings();
    this.listingsSub = this.listingsService.getListingUpdateListener()
      .subscribe((listings: Airbnb[]) => {
        this.isloading= false;
        this.listings = listings;
      });
  }

  onDelete(listingId: string)
  {
    this.listingsService.deleteListing(listingId);
  }

  ngOnDestroy() {
    this.listingsSub.unsubscribe();
  }

}
