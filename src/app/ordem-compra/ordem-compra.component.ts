import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CarrinhoService } from '../carrinho.service'
import {ItemCarrinho} from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup( {
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  } )

  public idPedidoCompra: number
  private itensCarrinho: ItemCarrinho[] = []


  constructor(private ordemCompraService: OrdemCompraService, private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.itensCarrinho =  this.carrinhoService.exibirItens()
  }

  public confirmarCompra(): void {
    if (this.formulario.status === "INVALID"){
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('complemento').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();

    } else {

      //Criando requisito para somente poder enviar o formulario de pedido, caso haja itens no carrinho( exibirItens() é a função que traz os itens adicionados no carrinho.
      if(this.carrinhoService.exibirItens().length === 0){
        alert('Você não selecionou nenhum item!')
      } else {

      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoService.exibirItens()
      )

        console.log(pedido)

      this.ordemCompraService.efetivarCompra(pedido).subscribe(
        (idPedido: number) => {
          this.idPedidoCompra = idPedido
          this.carrinhoService.limparCarrinho()
        }
      )

    }}
  }






}
