import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()

export class ApiService{
    
    
    private apiPath : string;
    private indicador : string;

    //http://www.mindicador.cl/api/{tipo_indicador}/{dd-mm-yyyy}
    constructor(private http: Http){
        this.apiPath = 'http://www.mindicador.cl/api';
        this.indicador = 'uf';
        console.log('Api service init..');
    }
    

    // Obtener valor de UF respecto a una fecha
    getUfFromDate(date : string){
        return this.http
                    .get(`${this.apiPath}/${this.indicador}/${date}`)
                    .map(data => data.json());
    }

}