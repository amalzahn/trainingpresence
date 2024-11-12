import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA , MatDialogModule, MatDialog} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
//import { Presence } from '../app.component';

export interface DialogData {
  presence: String;
  member: String;
  day: String;
  row: number;
}

@Component({
  selector: 'app-presence-edit',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatRadioModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './presence-edit.component.html',
  styleUrls: ['./presence-edit.component.scss']
})
export class PresenceEditComponent implements OnInit {
//  form : FormGroup;

  constructor(
//    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<PresenceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
//    this.form = this._fb.group({
//      presence: '',
//    });
  }

  ngOnInit(): void {
//    this.form.patchValue(this.data);
  }

}
