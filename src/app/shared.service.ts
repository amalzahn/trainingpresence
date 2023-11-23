import { Injectable } from '@angular/core';
import { Firestore, collectionData, doc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs:Firestore) {}

  getNotes(){
    let notes = collection(this.fs, 'notes');
    return collectionData(notes, {idField:'id'});
  }

  addNote(text:string){
    let data = {text:text};
    let notes = collection(this.fs, 'notes');
    return addDoc(notes, data);
  }
  deleteNote(id:string){
    let ref = doc(this.fs, 'notes/' + id);
    return deleteDoc(ref);
  }
}
