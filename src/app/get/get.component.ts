import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent {

  getCollectionCtrl = new FormControl('');
  getDocumentCtrl = new FormControl('');

  constructor(private collectionService: CollectionService) { }

  getCollection() {
    this.collectionService.getCollection(this.getCollectionCtrl.value);
  }
}
