import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import {interval, Observable, Subject} from 'rxjs';
import {Oferta} from '../shared/oferta.model';

import {switchMap, debounce, distinctUntilChanged, catchError} from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {
  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .pipe(

        debounce(() => interval(1000)), //executa a ação do switchMap após 1 segundo.
        distinctUntilChanged(), //para fazer pesquisas distintas
          switchMap((termo: string) => {
          // console.log('requisição http para api')
          if(termo.trim() === '') //o trim remove os espaços tanto da direita como da esquerda.
            { return of<Oferta[]>([])} //devolve um observable de array de ofertas vazio
          return this.ofertasService.pesquisaOfertas(termo)
          }),
        catchError((erro) => {
        console.log(erro)
        return of([])
        })
      )
  }

  public pesquisa(termoDaPesquisa: string): void {
    console.log('keyup caracter: ', termoDaPesquisa)
    this.subjectPesquisa.next(termoDaPesquisa)
  }

  limpaPesquisa(): void{
    this.subjectPesquisa.next('') //fará com que a logica entre no if, retornando um array vazio.
  }



}
