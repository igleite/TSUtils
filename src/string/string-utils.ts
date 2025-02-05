/**
 * Classe utilitária para manipulação de strings.
 */
export class StringUtils {

  /**
   * Propriedade estática que representa uma string vazia.
   * @type {string}
   */
  public static readonly Empty: string = '';

  /**
   * Verifica se uma string é nula, indefinida ou vazia.
   * @param {string} value - A string a ser verificada.
   * @returns {boolean} Verdadeiro se a string for nula, indefinida ou vazia; caso contrário, falso.
   *
   * @example
   * const result1 = StringUtils.isNullOrEmpty(null); // true
   * const result2 = StringUtils.isNullOrEmpty(''); // true
   * const result3 = StringUtils.isNullOrEmpty('test'); // false
   * const result4 = StringUtils.isNullOrEmpty(undefined); // true
   */
  public static isNullOrEmpty(value: string): boolean {
    try {
      return value === undefined || value === null || value?.trim() === '';
    } catch (error) {
      console.error('Error in isNullOrEmpty:', error);
      return true;
    }
  }

  /**
   * Remove todos os caracteres que não são números de uma string.
   * @param {string} value - A string a ser filtrada.
   * @returns {string} A string contendo apenas os caracteres numéricos.
   *
   * @example
   * const result1 = StringUtils.extractNumericCharacters('abc123def'); // '123'
   * const result2 = StringUtils.extractNumericCharacters('!@#456$%^'); // '456'
   * const result3 = StringUtils.extractNumericCharacters('7890'); // '7890'
   * const result4 = StringUtils.extractNumericCharacters(''); // ''
   */
  public static extractNumericCharacters(value: string): string {
    try {
      return value.replace(/[^0-9]/g, '');
    } catch (error) {
      console.error('Error in extractNumericCharacters:', error);
      return StringUtils.Empty;
    }
  }
}
