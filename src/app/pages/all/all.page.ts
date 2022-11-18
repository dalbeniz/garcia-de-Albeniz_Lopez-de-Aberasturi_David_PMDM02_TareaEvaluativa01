import { IArticulo } from './../../interfaces/mis-interfaces';
import { AlertController, ModalController } from '@ionic/angular';
import { GestionArticulosService } from './../../servicios/gestion-articulos.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all',
  templateUrl: 'all.page.html',
  styleUrls: ['all.page.scss'],
})
export class AllPage {

  // Inyectamos el servicio para gestionar articulos y el controlador de alertas
  constructor(public gestionArticulos: GestionArticulosService, private alerta: AlertController) {}

  checkBoxClick(e, url){
    if(e.detail.checked === true)
      this.gestionArticulos.almacenarArticulo(url);
    
    else
    this.gestionArticulos.sacarArticulo(url);

  }

  borrar(articulo: IArticulo) {
    this.presentarAlerta(articulo);
  }

   async presentarAlerta(articulo: IArticulo) {
    const alert = await this.alerta.create({
      backdropDismiss: false,                 // No permite hacer nada más hasta contestar a la alerta
      header: 'Borrar',
      message: 'Estas seguro de que quieres borrarlo?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            // console.log(data);
            // console.log(data.ID);
            this.gestionArticulos.borrarArticulo(articulo.url);
          }
        }
      ]
    });

    await alert.present();
  }
  
  
}