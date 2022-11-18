import { IArticulo } from './../interfaces/mis-interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GestionStorageService } from './gestion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionArticulosService {
  private articulos: IArticulo[] = [];
  private articulosCargados : IArticulo[] = [];

  constructor(private leerFichero: HttpClient, private gestionAlmacen: GestionStorageService) {
    
    let datosPromesa: Promise<IArticulo[]> = gestionAlmacen.getObject("articulos");

    // Si hay datos en local se recuperan. Si no se leen del fichero
    datosPromesa.then( datos => {
      datos=[];
      if (datos) {
        this.articulos.push(...datos);
      } else {
        this.getArticulosFichero();
      }
      this.getArticulosFichero();
     
      
    });
  }

  getArticulosFichero() {

    let datosFichero = this.leerFichero.get("/assets/datos/articulos.json") ;
    datosFichero.subscribe(datos => {
      for(let articulo of datos['articles']){
        this.articulos.push(this.formatoArticulo(articulo));
      }
      this.gestionAlmacen.setObject("articulos", this.articulos);
    });
  }

  formatoArticulo(val){
    return {
      id: val['source']['id'],
      name: val['source']['name'],
      author: val['author'],
      title:  val['title'],
      description:  val['description'],
      url:  val['url'],
      urlToImage:  val['urlToImage'],
      publishedAt: val['publishedAt'],
      content: val['content'] 
    };
  }

  getArticulos() {
    return this.articulos;
  }
  getArticulosCargados(){
    return this.articulosCargados;
  }

  almacenarArticulo(url: string){
    let articuloEncontrado: IArticulo = this.articulos.find(function(cadaArticulo) { return cadaArticulo.url == url });
      this.articulosCargados.push(articuloEncontrado);
  }


  sacarArticulo(url: string){
    
    let articuloEncontrado =  this.articulosCargados.find(function(cadaArticulo) { return cadaArticulo.url == url });
    if (articuloEncontrado) {
      // Busca el índice de la articulo
      let indice: number = this.articulos.indexOf(articuloEncontrado);

      if (indice != -1) {
        // Borra la articulo con el índice obtenido
        this.articulosCargados.splice(indice, 1);
      }
    }
  }

  // Borra el articulo con el url dado
  borrarArticulo(url: string) {
    this.sacarArticulo(url);
    // Busca la articulo con el id dado. Utiliza una función anónima como parámetro
    let articuloEncontrado: IArticulo = this.articulos.find(function(cadaArticulo) { return cadaArticulo.url == url });

    if (articuloEncontrado) {
      // Busca el índice de la articulo
      let indice: number = this.articulos.indexOf(articuloEncontrado);
      console.log(indice);

      if (indice != -1) {
        // Borra la articulo con el índice obtenido
        this.articulos.splice(indice, 1);
        this.gestionAlmacen.setObject("articulos", this.articulos);
      }
      
    }
  }
}
