import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VoitureListComponent } from './components/voiture-list/voiture-list.component';
import { VoitureFormComponent } from './components/voiture-form/voiture-form.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: VoitureListComponent },
    { path: 'add', component: VoitureFormComponent },
    { path: 'edit/:id', component: VoitureFormComponent },
];

@NgModule({
    imports: [RouterModule. forRoot(routes,
        {preloadingStrategy: PreloadAllModules}
    )],
    exports: [RouterModule]
})

export class AppRoutingModule{}
  