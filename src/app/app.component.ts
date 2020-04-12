import { Component } from '@angular/core';
import { Place} from './start.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  storedPosts: Place[] = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
