import { Component } from '@angular/core';
import { CollectionService } from './collection.service';

interface Item {
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CollectionService]
})
export class AppComponent {
  title = 'angularfire-basics';

  constructor(private collectionService: CollectionService) { }

}
