# TSUtils

TSUtils – Uma coleção de utilitários em TypeScript para facilitar o desenvolvimento no dia a dia.

## Instalação

Para instalar o pacote, utilize o seguinte comando:

```bash
npm i @igleite/tsutils
```

## Exemplos

Importe as classes no seu projeto:
   ```typescript
   import { StringUtils, TimeUtils } from '@igleite/tsutils';
   ```

Utilize os métodos conforme necessário em seu código.

   ```typescript

// Exemplo de uso de ArrayUtils (FlatMap)
const nestedArray = [1, [2, [3, 4]], 5];
const flatArray = ArrayUtils.flatMap(nestedArray);
console.log(flatArray); // Saída: [1, 2, 3, 4, 5]

// Exemplo de uso de Base64Url
const encoded = Base64Url.encode('Hello, World!');
console.log(encoded); // Saída: SGVsbG8sIFdvcmxkIQ

// Exemplo de formatação de CEP usando BrazilFormatUtils
console.log(BrazilFormatUtils.formatarCep('12345678')); // Retorna '12345-678'
console.log(BrazilFormatUtils.formatarCep(12345678)); // Retorna '12345-678'

// Exemplo de uso de CurrencyUtils para conversão de valores monetários
const decimal1 = CurrencyUtils.ToDecimal("1.234,56"); // Retorna 1234.56
const decimal2 = CurrencyUtils.ToDecimal("100,00");   // Retorna 100.00
const decimal3 = CurrencyUtils.ToDecimal(null);       // Retorna 0

// Exemplo de conversão de Data UTC para horário local usando DateUtils
const utcDate = new Date('2023-09-21T10:00:00Z');
const localDate = DateUtils.convertUTCDateToLocalDate(utcDate);
console.log(localDate); // Exibe a data convertida para o horário local

// Exemplo de verificação de campos vazios com FieldUtils
console.log(FieldUtils.hasEmptyFields(null, '', 'Hello')); // true
console.log(FieldUtils.hasEmptyFields(['Hello', 'World', ''])); // true
console.log(FieldUtils.hasEmptyFields(['Hello', 'World'], ['Test', 'Example'])); // false

// Exemplo de uso de StringUtils para verificar se uma string está vazia
console.log(StringUtils.isNullOrEmpty(null));      // true
console.log(StringUtils.isNullOrEmpty(''));        // true
console.log(StringUtils.isNullOrEmpty('test'));    // false
console.log(StringUtils.isNullOrEmpty(undefined)); // true

// Exemplo de conversão de segundos para o formato HH:mm:ss com TimeUtils
console.log(TimeUtils.converterSegundosParaHHMMSS(3665)); // Retorna "01:01:05"


   ```


## Contribuições

Sinta-se à vontade para abrir issues ou enviar pull requests caso deseje contribuir com melhorias ou correções.