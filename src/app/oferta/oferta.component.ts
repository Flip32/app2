import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable, Subscription} from 'rxjs';
import { interval } from 'rxjs';
import { Observer } from 'rxjs'


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})

export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta
  private tempoObservableSubscription: Subscription
  private meuObservableTesteSubscription: Subscription

  constructor ( private route: ActivatedRoute, private ofertasService: OfertasService) { }


  ngOnInit() {
    this.ofertasService.getOfertasPorId(this.route.snapshot.params['id'])
      .then(( oferta: Oferta ) => {
        this.oferta = oferta
        // console.log(oferta)
      })

   /* -======= INTRODUÇÃO AO OBSERVABLE  ======-*/
    /*Acessando a rota, o params vai retornar um Observable - algo que pode ser Observável - que contém um Objeto.
    *  Nesse caso, trata-se de parâmetros, que estamos encaminhando na rota.
    *  Agora podever nos inscrever com subscribe, assim tudo que for alterado, estará disponivel no Observável.
    *  Isso retornará um Objeto, nesse caso parametro do tipo any. */
    /*this.route.params.subscribe((parametro: any) => {
      console.log(parametro) },
      (erro: any) => {
      console.log(erro) },
      () => console.log('processamento foi classificado como concluido')
      )*/
    /* ============================================================================================ */


    /*Criando uma variável e atribuindo a ela um Observabel. O qual deve ser importado da Biblioteca rxjs, que já é incluso no Angular*/
    /* o Interval, operador de Observable,  é usado para capturar um inteiro em um determinado tempo. Doc rxjs. Para poder,
    * usá-los precisamos importar import { interval} from 'rxjs'; */
    // let tempo = Observable.interval(500)
    // tempo.subscribe((resposta:number) => {
    // console.log(resposta)
    // }) === não funciona no 7, usamos o interval direto.

    let tempo = interval(2000) /*Isso quer dizer que a cada 500ms o evento de interação de interval seja disparado pelo Observavle */

    /* Para acessar o Observable, precismos nos subscribe a ele, e assim dizer o que fazer, a cada evento disparado no intervalo de tempo descrito*/
    this.tempoObservableSubscription = tempo.subscribe((resposta:number) => {
      console.log(resposta)
    })


  //  observable (observável)
    let meuObservableTeste = Observable.create((observer: Observer<number>)=> {
      observer.next(1)
      observer.next(3)
      // observer.error('algum erro foi encontrado na stream de eventos')
      observer.complete()
      observer.next(6)
    }) /* Creates a new cold Observable by calling the Observable constructor// o metodo create passa os parametros para o subscribe */
    /*Esse value do next será encaminhado como valor para o resultado no subscribe*/
    /*Esse Obsrever é o Observador*/
    /*O error, não permite que passe outros parametros, sem que antes seja tratado o erro. Já o complete encerra o observable, tornando impossível passar novos param depois.*/

  //  observable (obervador)
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado: any) => console.log(resultado + 10),
      (erro: string) => console.log(erro),
      () => console.log('Stream de eventos foi finalizada')
    )








  /*==================*/
  /*Chave do ngOnIniti*/
  }


  ngOnDestroy() {
    this.meuObservableTesteSubscription.unsubscribe()
    this.tempoObservableSubscription.unsubscribe()
    /*  ===
    * Para evitarmos as memory leaks, devemos para o subscribe assim que saimos do componente. Fazemos isso com o ngOnDestroy.
    * Basta criar as variaveis do tipo Subscription - import {Subscription} from 'rxjs'; -, passar a elas o valor do subscribe, como acima,
    * e depois declará-las no ngOnDestrou com o método unsubscribe().
    * */

  }

  /*=========================*/
  /*Chave da Classe*/
}
