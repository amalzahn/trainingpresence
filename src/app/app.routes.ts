import { Routes } from '@angular/router';
import { PresenceComponent } from './presence/presence.component'
import { SettingsComponent } from './settings/settings.component';
import { MembersComponent } from './members/members.component';
import { DaysComponent } from './days/days.component';

export const routes: Routes = [
    {path: 'presence', component: PresenceComponent},
    {path: 'days', component: DaysComponent},
    {path: 'members', component: MembersComponent},
    {path: 'settings', component: SettingsComponent},
    {path: '**', component: PresenceComponent},
];
