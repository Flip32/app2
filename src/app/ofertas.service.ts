import { Oferta } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL_API} from './app.api';

//Biblioteca Reactive X JavaScript => PROGRAMAÇÃO REATIVA
import 'rxjs'

@Injectable() export class OfertasService {
    // private url_api = 'http://localhost:3000/ofertas'
    constructor (private http: HttpClient) {}

    public getOfertas(): Promise<Oferta[]> {
    //  efetuar uma requisição http/
      return this.http.get(`${URL_API}ofertas?destaque=true`)
        //coverte o Observeble para Promise
        .toPromise()
        .then((resposta: any) => resposta)
      //  retornar uma promise Oferta[]
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]>{
      return this.http.get(`${URL_API}ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta)
    }

    public getOfertasPorId(id: number): Promise<Oferta> {
      return this.http.get(`${URL_API}ofertas?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
          return resposta[0]
        })
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
      return this.http.get(`${URL_API}como-usar?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
          return resposta[0].descricao
        })
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
      return this.http.get(`${URL_API}onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
          // console.log(resposta[0].descricao)
          return resposta[0].descricao

        })
    }

}
