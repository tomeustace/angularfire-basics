import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  collectionCtrl = new FormControl('');
  documentCtrl = new FormControl('');
  created$: any;

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {}

  createCollection() {
    this.collectionService.createCollection(
      this.collectionCtrl.value,
      this.documentCtrl.value
    );
  }
}
