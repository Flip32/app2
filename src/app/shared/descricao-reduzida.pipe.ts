import { PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'descricaoReduzida' //o name é o metadado que vamos utilizar em conjunto com o dado, para indicar como que aquela informação deve ser transformada.
})
export class DescricaoReduzida implements PipeTransform{
  transform(texto: string, truncarEm: number, iniciarEm: number): string {
    if (texto.length > truncarEm) {
      return texto.substr(iniciarEm, truncarEm) + '... '
    }
    return texto
  }
}

/* Precisa declarar no app.module.ts */
/* É preciso decorar o pipe para que o Angular entenda que não é um componente e sim um pipe */
