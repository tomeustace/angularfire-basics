import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  collectionCtrl = new FormControl('');
  documentCtrl = new FormControl('');

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {}

  /**
   * Delete a document from a collection
   */
  deleteDocument() {
    console.log('deleteDocument', this.collectionCtrl.value, this.documentCtrl.value);
    this.collectionService.deleteDocument(
      this.collectionCtrl.value,
      this.documentCtrl.value
    );
  }
}
