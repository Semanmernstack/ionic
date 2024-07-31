import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { DetailsPage } from './home/details/details.page';
import { AddFormComponent } from './add-form/add-form.component';
import { EditComponent } from './edit/edit.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePage,
    pathMatch: "full"
  },
  {
    path: 'details-page/:itemId', 
    component: DetailsPage
  },
  { path: 'edit/:id', component: EditComponent },
  {
    path: 'add-form-page',
    component: AddFormComponent
  }
  
  
];









