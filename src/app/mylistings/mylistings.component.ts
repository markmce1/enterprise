import { Component,  OnInit, OnDestroy } from '@angular/core'; 
import { ListingsService } from '../listings.service';
import { Airbnb } from '../start.model';

import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Authservice } from '../auth.service';


@Component({
  selector: 'app-mylistings',
  templateUrl: './mylistings.component.html',
  styleUrls: ['./mylistings.component.scss']
})
export class MylistingsComponent implements OnInit {

  listings: Airbnb[] = [];
  private listingsSub: Subscription;
  isloading = false;
  totalListings = 0;
  authId: string;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  
  constructor(private listingsService: ListingsService, private authService:Authservice) { }
  ngOnInit() {
    this.isloading = true;
    this.listingsService.getListings(null,null);
    this.authId = this.authService.getAuthId();
    this.listingsSub = this.listingsService.getListingUpdateListener()
      .subscribe((listingData: {listings: Airbnb[], listingCount:number}) => {
        this.isloading= false;
        this.listings = listingData.listings;
      });
      this.userIsAuthenticated = this.authService.getAuthStatus();
      this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated=> {
        this.userIsAuthenticated = isAuthenticated;
        this.authId = this.authService.getAuthId();
      });
  }

  onChangedPage(pageData:PageEvent)
  {
    this.isloading = true;
    this.listingsService.getListings(null,null);
  }

  onDelete(listingId: string)
  {
    this.isloading = true;
    this.listingsService.deleteListing(listingId).subscribe(() => {
      this.listingsService.getListings(null,null);
    });
  }

  ngOnDestroy() {
    this.listingsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
