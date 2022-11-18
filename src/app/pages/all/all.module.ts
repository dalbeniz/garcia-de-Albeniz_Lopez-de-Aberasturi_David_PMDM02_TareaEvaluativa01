import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AllPage } from './all.page';

import { AllPageRoutingModule } from './all-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllPageRoutingModule
  ],
  declarations: [AllPage]
})
export class AllPageModule {}
