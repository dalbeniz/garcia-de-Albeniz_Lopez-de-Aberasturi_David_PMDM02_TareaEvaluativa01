import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargedPage } from './charged.page';

const routes: Routes = [
  {
    path: '',
    component: ChargedPage,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargedPageRoutingModule {}
