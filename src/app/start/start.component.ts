import { Component, EventEmitter, Output } from '@angular/core';
import { Airbnb } from '../start.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']

})
export class StartComponent {
    enteredName = "";
    enteredSummary = "";
    @Output() postCreated = new EventEmitter<Airbnb>();

    constructor(public postsService: PostsService) { }
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addListing(form.value.name, form.value.summary, form.value.location, form.value.description);
    form.resetForm();
  }



}  