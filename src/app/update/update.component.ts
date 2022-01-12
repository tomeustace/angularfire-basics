import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  collectionCtrl = new FormControl('');
  documentCtrl = new FormControl('');
  created$: any;

  data = {
    name: 'update value',
  };

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {}

  createCollection() {
    this.collectionService.updateDocument(
      this.collectionCtrl.value,
      this.documentCtrl.value,
      this.data
    );
  }
}
