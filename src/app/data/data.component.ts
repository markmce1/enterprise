import { Component,  OnInit, OnDestroy } from '@angular/core'; 
import { ListingsService } from '../listings.service';
import { Airbnb } from '../start.model';

import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Authservice } from '../auth.service';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {


  listings: Airbnb[] = [];
  private listingsSub: Subscription;
  isloading = false;
  totalListings = 0;
  listingsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  
  constructor(private listingsService: ListingsService, private authService:Authservice) { }
  ngOnInit() {
    this.isloading = true;
    this.listingsService.getListings(this.listingsPerPage, this.currentPage);
    this.listingsSub = this.listingsService.getListingUpdateListener()
      .subscribe((listingData: {listings: Airbnb[], listingCount:number}) => {
        this.isloading= false;
        this.totalListings = listingData.listingCount
        this.listings = listingData.listings;
      });
      this.userIsAuthenticated = this.authService.getAuthStatus();
      this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated=> {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onChangedPage(pageData:PageEvent)
  {
    this.isloading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.listingsPerPage = pageData.pageSize;
    this.listingsService.getListings(this.listingsPerPage, this.currentPage);
  }

  onDelete(listingId: string)
  {
    this.isloading = true;
    this.listingsService.deleteListing(listingId).subscribe(() => {
      this.listingsService.getListings(this.listingsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.listingsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
