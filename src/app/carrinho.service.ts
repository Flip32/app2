import {ItemCarrinho } from './shared/item-carrinho.model';
import {Oferta} from './shared/oferta.model';

class CarrinhoService {

  public itens: ItemCarrinho[] = []

  public exibirItens(): ItemCarrinho[] {
    return this.itens
  }

  public incluirItem(oferta: Oferta): void {
    let itemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1
    )
    //Verificar se o item em questão já não existe dentro do this.itens
    //O find funciona como um loop.
    //item.id === itemCarrinho.id, é a condição dessa pesquisa. Caso volte verdadeiro, retornará uma referência para essa posição desse array de itens, associando-a a uma variável. Obs>: Não é uma cópia e sim uma referencia.
    //Caso seja criada esse referencia, itemCarrinhoEncotrado passa a ter o valor daquele item, assim usamos a condição if para verificar sé há alguma coisa la, e havendo, mudamos a quantidade para mais 1. Caso não haja, incluimos o novo item com o push.
    let itemCarrinhoEncontrado = this.itens.find( (item: ItemCarrinho) => item.id === itemCarrinho.id)

    if(itemCarrinhoEncontrado){
        itemCarrinhoEncontrado.quantidade += 1
    } else {
      this.itens.push(itemCarrinho)
    }
  }

 public totalCarrinhoCompras(): number {

    let total: number = 0
    // O map é uma função nativa de array JS, ela percorre cada um dos indices do array, recuperando em cada um dos loops, o respectivo item em questão.
   this.itens.map((item: ItemCarrinho) => {
     total = total + (item.valor * item.quantidade)
   })
   return total
 }

 public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
   if(itemCarrinhoEncontrado){
     itemCarrinhoEncontrado.quantidade += 1
   }
 }

 public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
   console.log('O que é o itemCarrinhoEncontrado? ' ,itemCarrinhoEncontrado)
   if(itemCarrinhoEncontrado){
     if(itemCarrinhoEncontrado.quantidade > 0) {
       itemCarrinhoEncontrado.quantidade -= 1
     } else {

       //o splice recorta uma posição. O indexOf retorna a chave de determinado item
          this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
     }
   }
 }

 public limparCarrinho(): void{
    this.itens = []
 }



}

export { CarrinhoService }
