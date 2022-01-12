import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class CollectionService {

  allCollections = false;
  COLLECTION_LIST = 'collectionList';

  constructor(private afs: AngularFirestore) {
    if (!this.allCollections) {
      this.createCollectionList();
    }
  }

  /**
   * @param collectionName
   * @param documentName
   * Create a collection.  If no documentName is provided a document
   * will be created with auto generated id.
   */
  createCollection(collectionName: string, documentName?: string) {
    if (documentName) {
      try {
        this.afs
          .collection(collectionName)
          .doc(documentName)
          .set({ name: 'my value' })
        this.addCollectionToList(collectionName);
      } catch(error) {
        console.error('createCollection', error);
      }
    } else {
      try {
        this.afs
          .collection(collectionName)
          .doc()
          .set({ name: 'my value' });
        this.addCollectionToList(collectionName);
      } catch(error) {
        console.error('createCollection', error);
      }
    }
  }

  /**
   * @param collectionName
   * Shows how to subscribe to a collection or document.
   * valueChanges() - listen to all documents in collection
   * snapshotChanges() - listen to all documents in collection and their metadata, e.g. document ID
   */
  getCollection(collectionName: string, documentName?: string) {
    const collection = this.afs.collection(collectionName);

    if (documentName) {

      const docValue$: Observable<unknown> = collection.doc(documentName).valueChanges();
      docValue$.subscribe((res) => {
        console.log(`Document value changed ${collectionName}/${documentName}: ${res}`);
      });

      // will show the collection changes, modified, added, removed etc
      const docSnapshot$: Observable<unknown> = collection.doc(documentName).snapshotChanges();
      docSnapshot$.subscribe((res) => {
        console.log(`Document snapshot changed ${collectionName}/${documentName}: ${res}`);
      });

    } else {

      const value$: Observable<unknown[]> = collection.valueChanges();
      value$.subscribe((res) => {
        console.log(`Collection value changed ${collectionName}: ${res}`);
      });

      // will show the collection changes, modified, added, removed etc
      const snapshot$: Observable<DocumentChangeAction<any>[]> =
        collection.snapshotChanges();
      snapshot$.subscribe((res) => {
        console.log(`Collection snapshot changed ${collectionName}: ${res}`);
      });

    }
  }

  /**
   * @param collectionName
   * @param documentName
   * Update data in document
   */
  updateDocument(collectionName: string, documentName: string, data: any) {
    this.afs.collection(collectionName).doc(documentName).update(data);
  }

  /**
   * @param collectionName
   * @param documentName
   * Update data in document
   * NOTE: Deleting a collection requires coordinating an unbounded number of individual
   * delete requests. If you need to delete entire collections, do so only from a
   * trusted server environment. While it is possible to delete a collection from a
   * mobile/web client, doing so has negative security and performance implications.
   */
  deleteDocument(collectionName: string, documentName?: string) {
    this.afs.collection(collectionName).doc(documentName).delete();
  }

  /**
   * Create a collection list.
   * This is for keeping track of all collections created.
   */
  private createCollectionList() {
    this.afs
      .collection(this.COLLECTION_LIST)
      .doc('list')
      .set({})
      .then(() => {
        this.allCollections = true;
      });
  }

  /**
   * @param collectionName
   * For each collection created a document with same name will be added
   * to the collection list.
   */
  private addCollectionToList(collectionName: string) {
    this.afs
      .collection(this.COLLECTION_LIST)
      .doc(collectionName)
      .set({ name: 'test' })
      .then(() => {
        this.allCollections = true;
      });
  }

  /**
   * Get all available collections.
   */
  getAllCollections() {
    this.afs
      .collection(this.COLLECTION_LIST)
      .valueChanges()
      .subscribe((res) => {
        console.log('All collections', res);
      });
  }
}
