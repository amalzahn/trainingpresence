import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface DayPresence {
  day: number;
  holiday: boolean;
  beach: boolean;
  halle: boolean;
  presence:any;
}

const DAY_DATA: DayPresence[] = [
  {day:Number(Date.now()), holiday: false, beach:true, halle:false, presence:{"Andi":"ja"}},
  {day:Number(Date.now())+1, holiday: true, beach:false, halle:false, presence:{"Andi":"nein"}},
];

@Component({
  selector: 'app-days',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})

export class DaysComponent {
  dayDisplayedColumns: string[] = ['day', 'holiday', 'beach', 'halle'];
  dayDataSource = DAY_DATA;

}
