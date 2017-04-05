import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  
  private date : string;  
  private value : number;
  
  constructor(public navCtrl: NavController, private apiService : ApiService) {
    this.date = '';
  }
  
  //Obtener valor uf desde el ApiService
  onChangeDate(){
    
    //Formatear fecha
    this.date = this.formatDate(this.date);
    //Ir al api
    this.apiService.getUfFromDate(this.date)
        .subscribe((value) => {
          this.value = value.serie[0].valor;
          console.log(this.value);
        });     
  }
  

  //Convertir cantidad de uf a pesos
  setUfToPesos(cantidadUf : number, valorUf : number){
 
     return cantidadUf * valorUf;
  }

  //Convertir pesos to UF
  setPesosToUF(cantidadPesos: number, valorUf:number){

  }


  // Dar formato necesario a la fecha
  formatDate(date : string){
    let items = date.split('-');
    let formatedDate = items.reverse().map((d)=>{
      return d;
    }).join('-');
    return formatedDate; 
  }

}