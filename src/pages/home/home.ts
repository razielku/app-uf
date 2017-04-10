import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  /**
  * fecha seleccionada por el usuario
  **/
  private date    :   string = new Date().toISOString();
  /**
  * valor UF en CLP del día seleccionado 
  **/
  private value   :   number;
  /**
  * numerico UF ingresado por usuario 
  **/
  private ufto    :   number;
  /**
  * numerico CLP ingresado por usuario
  **/
  private clpto   :   number;
  /**
  * Contenedor de resultado de  setUfToPesos
  **/
  private clp     :   number;
  /**
  * Contenedor de resultado de  setPesosToUF
  **/
  private uf      :   number;

  constructor(public navCtrl: NavController, private apiService : ApiService) {
    //this.date = '';
    if(this.date!=''){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        var m = '';
        var d = '';

        d=(dd<10?'0':'')+dd;
        m=(mm<10 ? '0':'')+mm;
        var tday = yyyy+'-'+m+'-'+d;
        this.date = tday;
        this.onChangeDate();
    }
  }
  
  //Obtener valor uf desde el ApiService
  onChangeDate(){
    
    //Formatear fecha
    var day = this.formatDate(this.date);
    //Ir al api
    this.apiService.getUfFromDate(day)
        .subscribe((value) => {
          this.value = value.serie[0].valor;
        });

  }
  
  /**
  *cantidad de UF a CLP
  */
  setUfToPesos(event : any){
    //console.log('setUfToPesos event', event);
    //console.log(this, this.ufto);
    this.clp = this.ufto * this.value;
    if(isNaN(this.clp)) this.clp = null;
  }

  /**
  *cantidad de CPL a UF
  */
  setPesosToUF(event : any){
    //console.log('setPesosToUF event', event);
    //console.log(this, this.clpto);
    this.uf = this.value != 0 ? this.clpto / this.value : 0;
    if(isNaN(this.uf)) this.uf = null;
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
