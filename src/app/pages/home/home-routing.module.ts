import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'all',
        loadChildren: () => import('../all/all.module').then(m => m.AllPageModule)
      },
      {
        path: 'charged',
        loadChildren: () => import('../charged/charged.module').then(m => m.ChargedPageModule)
      },
     
      {
        path: '',
        redirectTo: '/home/all',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/all',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
