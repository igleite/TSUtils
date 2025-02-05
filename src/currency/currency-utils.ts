/**
 * Classe utilitária para manipulação de valores monetários.
 */
export class CurrencyUtils {

  /**
   * Converte uma string de valor monetário em um número decimal.
   *
   * Este método espera que o valor de entrada esteja no formato de string, onde os pontos
   * são usados como separadores de milhar e vírgulas como separadores decimais.
   * Se a entrada for nula, retorna 0.
   *
   * @param {string | null} input - A string a ser convertida em decimal.
   * @returns {number} O valor decimal correspondente.
   *
   * @example
   * const decimal1 = CurrencyUtils.ToDecimal("1.234,56"); // 1234.56
   * const decimal2 = CurrencyUtils.ToDecimal("100,00"); // 100.00
   * const decimal3 = CurrencyUtils.ToDecimal(null); // 0
   */
  public static ToDecimal(input: string | null): number {
    try {
      if (input === null) {
        return 0;
      }

      input = input.replace('.', '');
      input = input.replace(',', '.');
      return parseFloat(input);
    } catch (error) {
      console.error('Error in ToDecimal:', error);
      return 0;
    }
  }

  /**
   * Converte um número decimal em uma string de preço no formato monetário.
   *
   * O método converte o número em uma string, onde a parte decimal é representada por uma vírgula.
   * Se a entrada for nula, retorna null. Se houver apenas um dígito decimal, adiciona um zero.
   *
   * @param {number | null} input - O número a ser convertido em formato de preço.
   * @returns {string | null} A string formatada como preço.
   *
   * @example
   * const price1 = CurrencyUtils.ToPrice(1234.56); // "1.234,56"
   * const price2 = CurrencyUtils.ToPrice(100); // "100,00"
   * const price3 = CurrencyUtils.ToPrice(null); // null
   */
  public static ToPrice(input: number | null): string | null {
    try {
      let ret = (input) ? input.toString().replace('.', ',') : null;
      if (ret) {
        const decArr = ret.split(',');
        if (decArr.length > 1) {
          const dec = decArr[1].length;
          if (dec === 1) {
            ret += '0';
          }
        }
      }
      return ret;
    } catch (error) {
      console.error('Error in ToPrice:', error);
      return null;
    }
  }
}
