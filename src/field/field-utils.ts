import {StringUtils} from "../string/string-utils";

/**
 * Classe utilitária para manipulação de validações relacionadas a campos.
 */
export class FieldUtils {

  /**
   * Verifica se algum dos campos passados como argumento está vazio, nulo ou indefinido.
   * Se um array for fornecido, também verifica se algum dos elementos dentro do array está vazio.
   *
   * @param {...any} fields - Os campos a serem verificados. Pode incluir valores individuais ou arrays de valores.
   * @returns {boolean} - Verdadeiro se algum dos campos estiver vazio, nulo ou indefinido; caso contrário, falso.
   *
   * @example
   * const result1 = FieldUtils.hasEmptyFields(null, '', 'Hello'); // true
   * const result2 = FieldUtils.hasEmptyFields(['Hello', 'World', '']); // true
   * const result3 = FieldUtils.hasEmptyFields(['Hello', 'World'], ['Test', 'Example']); // false
   */
  public static hasEmptyFields(...fields: any[]): boolean {
    try {
      for (const field of fields) {
        if (Array.isArray(field)) {
          if (field.some(item => StringUtils.isNullOrEmpty(item))) {
            return true;
          }
        } else if (StringUtils.isNullOrEmpty(field)) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error in hasEmptyFields:', error);
      return false;
    }
  }

  /**
   * Verifica se todos os campos fornecidos são iguais.
   *
   * @param {...{firstValue: any, secondaryValue: any}[]} fields - Lista de objetos contendo dois valores a serem comparados.
   * @returns {boolean} - Retorna `true` se todos os campos forem iguais, caso contrário, `false`.
   *
   * @example
   * const result = FieldUtils.areFieldsNotEqual(
   *   { firstValue: 'test', secondaryValue: 'test' },
   *   { firstValue: 'example', secondaryValue: 'example' }
   * ); // true
   *
   * const result2 = FieldUtils.areFieldsNotEqual(
   *   { firstValue: 'test', secondaryValue: 'test' },
   *   { firstValue: 'example', secondaryValue: 'test' }
   * ); // false
   */
  public static areFieldsNotEqual(...fields: { firstValue: any; secondaryValue: any }[]): boolean {
    try {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].firstValue !== fields[i].secondaryValue) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error('Error in areFieldsNotEqual:', error);
      return false;
    }
  }

  /**
   * Verifica se todos os campos fornecidos estão vazios.
   *
   * @param {...any[]} fields - Uma lista de campos a serem verificados.
   * @returns {boolean} - Retorna `true` se todos os campos estiverem vazios, caso contrário, retorna `false`.
   *
   * @example
   * const campo1 = null;
   * const campo2 = 'preenchido';
   * const campo3 = undefined;
   *
   * console.log(FieldUtils.areAllFieldsEmpty(campo1, campo2, campo3)); // Saída: false
   * console.log(FieldUtils.areAllFieldsEmpty(campo1, campo3)); // Saída: true
   */
  public static areAllFieldsEmpty(...fields: any[]): boolean {
    try {
      for (const field of fields) {
        if (field !== null && field !== undefined && field !== '') {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error('Error in areAllFieldsEmpty:', error);
      return false;
    }
  }
}
