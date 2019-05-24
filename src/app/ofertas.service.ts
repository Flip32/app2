import { Oferta } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL_API} from './app.api';

//Biblioteca Reactive X JavaScript => PROGRAMAÇÃO REATIVA
import 'rxjs'
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {retry} from 'rxjs/operators';

@Injectable() export class OfertasService {

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
    //o _like é para valores semelhantes
  /* ==========
  * Para realizar-mos uma pesquisa é necessário criar um método que retorna um Observable e transformá-lo em um map,
  * dizendo que tipo de dado queremos receber. Nesse caso, iremos receber um json resposta.json().
  * Pois, o http retorna varias coisas, e queremos apenas o body.
  * O retry vai repetir o observable, por X quantidade de vezes, caso haja algum erro.
  * */
    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
      return this.http.get(`${URL_API}ofertas?descricao_oferta_like=${termo}`)
        .pipe(retry(10))
        .pipe(map((resposta: any) => resposta)
        )
    }

}
