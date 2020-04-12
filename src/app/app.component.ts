import { Component } from '@angular/core';
import { Airbnb} from './start.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  storedPosts: Airbnb[] = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
