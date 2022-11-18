import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ChargedPage } from './charged.page';

import { ChargedPageRoutingModule } from './charged-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChargedPageRoutingModule
  ],
  declarations: [ChargedPage]
})
export class ChargedPageModule {}
