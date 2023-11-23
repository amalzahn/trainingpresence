import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';
import { MatTableModule } from '@angular/material/table';

export interface Member {
  name: string;
  email: string;
  modified: Timestamp;
}

const MEMBER_DATA: Member[] = [
  {name: 'Andi', email: "andi@malis.ch", modified: Timestamp.now()},
  {name: 'Roger', email: "roger@malis.ch", modified: Timestamp.now()},
];

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {
  memberDisplayedColumns: string[] = ['name', 'email', 'modified'];
  memberDataSource = MEMBER_DATA;
}
