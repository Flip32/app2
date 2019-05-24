import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import  { CarrinhoService } from '../carrinho.service';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})

export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta


  constructor ( private route: ActivatedRoute, private ofertasService: OfertasService, private carrinhoService: CarrinhoService) { }


  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {
    /* O params, retorna um observable, toda vez que há modificações */
      this.ofertasService.getOfertasPorId(parametros.id)
        .then(( oferta: Oferta ) => {
          this.oferta = oferta
        })
    })
  /*==================*/
  /*Chave do ngOnIniti*/
  }

  ngOnDestroy() {  }



  adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta)
    console.log('Estes são os itens no carrinho ', this.carrinhoService.exibirItens())

  }



  /*=========================*/
  /*Chave da Classe*/
}
