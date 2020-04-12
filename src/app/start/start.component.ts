import { Component, EventEmitter, Output } from '@angular/core';
import { Airbnb } from '../start.model';
import { NgForm } from '@angular/forms';
import { ListingsService } from '../listings.service';
@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']

})
export class StartComponent {
    enteredName = "";
    enteredSummary = "";
    @Output() listingCreated = new EventEmitter<Airbnb>();

    constructor(public listsService: ListingsService) { }
  onAddListing(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.listsService.addListing(form.value.name, form.value.summary, form.value.location, form.value.description);
    form.resetForm();
  }



}  