import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule , MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PresenceEditComponent } from '../presence-edit/presence-edit.component';
import { SharedService } from '../shared.service';
import { Timestamp } from '@angular/fire/firestore';

export interface Member {
  name: string;
  email: string;
  modified: Timestamp;
}

const MEMBER_DATA: Member[] = [
  {name: 'Andi', email: "andi@malis.ch", modified: Timestamp.now()},
  {name: 'Roger', email: "roger@malis.ch", modified: Timestamp.now()},
]

export interface Presence {
  member: string;
  day: string;
  value: string;
}

const PRESENCE_DATA: Presence[] = [
  {member: "Ferien", day:"17.8.", value:"Ja"},
  {member: "Beach", day:"23.8.", value:"Vielleicht"},
  {member: "Halle", day:"23.8.", value:""},
  {member: "Andi", day:"17.8.", value:"nö"},
  {member: "Roger", day:"23.8.", value:"Ja"},
];

// One day Time in ms (milliseconds)
const one_day = 1000 * 60 * 60 * 24;

@Component({
    selector: 'app-presence',
    imports: [CommonModule, MatTableModule, MatDialogModule, PresenceEditComponent],
    templateUrl: './presence.component.html',
    styleUrls: ['./presence.component.scss']
})
export class PresenceComponent {
  presenceDisplayedColumns: string[] = []; //['spieler','yesterday','today','tomorrow'];
  presenceDataSource: Record<string,string>[] = []; //PRESENCE_DATA;
  presenceColumnClass: { [id: string] : string; }  = {};
  startDate: Date = new Date();
  numDays = 10;
  weeksBack = 4;
  trainingDay = 3;
  sumRow = 3;
  member2line = new Map<string,number> ();

  constructor(private service:SharedService, private _presenceDialog: MatDialog){}

  notes:any = [{text:"test"}, {text:"test2"}];

  refreshNotes() {
    return;

//    this.service.getNotes().subscribe((res)=>{
//      this.notes = res;
//    }
  }

  ngOnInit(){-
    this.refreshNotes();

    this.createPresenceData();
  }

  createPresenceData()
  {
    var present_date = new Date();
    const now = present_date.getTime();
    let startday = now / one_day; // convert to day
    // adjust  date to wednesday
    startday += (-present_date.getDay() + 7 + this.trainingDay) % 7;
    const nextTrainingDay = startday * one_day;
    startday -= this.weeksBack * 7; // one month back

    // calc days
    this.presenceDisplayedColumns = [];
    this.presenceDataSource = [];
    this.presenceColumnClass = {};
    this.presenceDisplayedColumns.push('Spieler');
    this.presenceDisplayedColumns.push('Geändert');

//    this.presenceDataSource.push({Spieler:'Ferien', rowclass:'ferien'})
    this.presenceDataSource.push({Spieler:'Beach', rowclass:'beach'})
    this.presenceDataSource.push({Spieler:'Halle', rowclass:'halle'})
    this.presenceDataSource.push({Spieler:'Summe', rowclass:'summe'})

    let index = -1;
//    this.member2line.set('Ferien',++index);
    this.member2line.set('Beach',++index);
    this.member2line.set('Halle',++index);
    this.member2line.set('Summe',++index);
    this.sumRow = index;

    for (let m of MEMBER_DATA) {
      const memberEntry = {Spieler:m.name,Geändert:m.modified.toDate().toLocaleString()};
      this.presenceDataSource.push(memberEntry)
      // #
      this.member2line.set(memberEntry.Spieler, ++index);
    }

    for (let i = 0; i < this.numDays; ++i) {
      let day = (startday + i * 7) * one_day;
      let date = new Date(day);
      let dayString = date.getDate().toString() + '.' +  (date.getMonth() + 1).toString() + '.';
      //let dayData = this.dayDataSource[i];
      this.presenceDisplayedColumns.push(dayString);
      if (day == nextTrainingDay)
        this.presenceColumnClass[dayString] = 'nexttrainingday';
      //const p = {member:'x', dayString:'y'};
      for (let p in this.presenceDataSource) {
        this.presenceDataSource[p][dayString] = "";
      }
      //this.presenceDataSource.push(p)
    }

    for (let p of PRESENCE_DATA) {
      let x = this.member2line.get(p.member);
      if (x !== undefined) {
        this.presenceDataSource[x][p.day] = p.value;
      }
    }

    this.setSum();
  }

  setSum() {
    let sum : Map<string, number> = new Map();
    
    for (let row = this.sumRow+1; row < this.presenceDataSource.length; ++row) {
      let rowData = this.presenceDataSource[row];
      for (let day of this.presenceDisplayedColumns) {
        let value = rowData[day];
        if (value == 'Ja' || value == 'Vielleicht') {
          let s = sum.get(day);
          if (s == undefined)
            s = 0;
          sum.set(day, s+1);
        }
      }
    }

    for (let s of sum) {
      this.presenceDataSource[this.sumRow][s[0]] = s[1].toString();
    }
  }

  openEditForm(member:String, day:string, presence1:string, row:number) {

    if (row == this.sumRow)
      return;

    if (day == 'Spieler' || day == 'Geändert')
      return;

    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      presence : presence1,
      day : day,
      member : member,
      row: row,
    };

    const dialogRef = this._presenceDialog.open(PresenceEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Presence Dialog output:", data)
        if (data) {
          this.presenceDataSource[row][data.day] = data.presence;
          this.setSum();
        }
      }
  );    
}

}

