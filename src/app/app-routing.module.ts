import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'create/:id', component: CreateComponent },
  { path: 'create', component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
