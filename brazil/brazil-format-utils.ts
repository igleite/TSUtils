import {StringUtils} from "../string/string-utils";

/**
 * Classe utilitária para formatação de valores específicos do Brasil formatos comuns utilizados no Brasil.
 */
export class BrazilFormatUtils {

  /**
   * Formata um valor numérico ou string como CPF ou CNPJ.
   *
   * Se o valor contém 11 dígitos, ele será formatado como um CPF no formato `XXX.XXX.XXX-XX`.
   * Se o valor contém 14 dígitos, ele será formatado como um CNPJ no formato `XX.XXX.XXX/XXXX-XX`.
   * Se o valor não tiver nem 11 nem 14 dígitos, ele será retornado sem formatação.
   *
   * @param {string | number} value - O valor a ser formatado como CPF ou CNPJ. Pode ser um número ou uma string.
   * @returns {string} - O valor formatado como CPF ou CNPJ, ou o valor original se não tiver o número correto de dígitos.
   */
  public static formatarCpfCnpj(value: string | number): string {
    try {
      const formattedValue: string = typeof value === 'number' ? value.toString() : value;

      if (StringUtils.isNullOrEmpty(formattedValue)) {
        return StringUtils.Empty;
      }

      const numericValue: string = StringUtils.extractNumericCharacters(formattedValue);

      if (numericValue.length === 11) {
        return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }

      if (numericValue.length === 14) {
        return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      }

      return formattedValue;
    } catch (error) {
      console.error('Error in formatarCpfCnpj:', error);
      return StringUtils.Empty;
    }
  }

  /**
   * Formata um valor numérico ou string como CEP.
   *
   * O CEP é formatado no formato `XXXXX-XXX`, onde X é um dígito numérico.
   * Se o valor não tiver 8 dígitos, ele será retornado sem formatação.
   *
   * @param {string | number} value - O valor a ser formatado como CEP. Pode ser um número ou uma string.
   * @returns {string} - O valor formatado como CEP, ou o valor original se não tiver o número correto de dígitos.
   *
   * @example
   * // Formatação de CEP
   * BrazilFormatUtils.formatarCep('12345678'); // Retorna '12345-678'
   *
   * @example
   * // Valor numérico
   * BrazilFormatUtils.formatarCep(12345678); // Retorna '12345-678'
   */
  public static formatarCep(value: string | number): string {
    try {
      const formattedValue: string = typeof value === 'number' ? value.toString() : value;

      if (StringUtils.isNullOrEmpty(formattedValue)) {
        return StringUtils.Empty;
      }

      const numericValue: string = StringUtils.extractNumericCharacters(formattedValue);

      // Formatação de CEP (8 dígitos)
      if (numericValue.length === 8) {
        return numericValue.replace(/(\d{5})(\d{3})/, '$1-$2');
      }

      // Caso o valor não corresponda ao formato de CEP, retorna o valor original formatado
      return formattedValue;
    } catch (error) {
      console.error('Error in formatarCep:', error);
      return StringUtils.Empty;
    }
  }

  /**
   * Formata um valor numérico ou string como telefone.
   *
   * O telefone é formatado no formato `(XX) XXXXX-XXXX` ou `(XX) XXXX-XXXX`.
   * Se o valor não tiver 10 ou 11 dígitos, ele será retornado sem formatação.
   *
   * @param {string | number} value - O valor a ser formatado como telefone. Pode ser um número ou uma string.
   * @returns {string} - O valor formatado como telefone, ou o valor original se não tiver o número correto de dígitos.
   */
  public static formatarTelefone(value: string | number): string {
    try {
      const formattedValue: string = typeof value === 'number' ? value.toString() : value;

      if (StringUtils.isNullOrEmpty(formattedValue)) {
        return StringUtils.Empty;
      }

      const numericValue: string = StringUtils.extractNumericCharacters(formattedValue);

      // Formatação de telefone (11 dígitos - celular)
      if (numericValue.length === 11) {
        return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }

      // Formatação de telefone (10 dígitos - fixo)
      if (numericValue.length === 10) {
        return numericValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      }

      // Caso o valor não corresponda ao formato de telefone, retorna o valor original formatado
      return formattedValue;
    } catch (error) {
      console.error('Error in formatarTelefone:', error);
      return StringUtils.Empty;
    }
  }

}
