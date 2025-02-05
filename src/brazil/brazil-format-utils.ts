import {StringUtils} from "../string/string-utils";

/**
 * Classe utilitária para formatação de valores específicos do Brasil formatos comuns utilizados no Brasil.
 */
export class BrazilFormatUtils {

  private static codigoPlacaMercosul: Map<number, string> = new Map([
    [0, 'A'],
    [1, 'B'],
    [2, 'C'],
    [3, 'D'],
    [4, 'E'],
    [5, 'F'],
    [6, 'G'],
    [7, 'H'],
    [8, 'I'],
    [9, 'J'],
  ]);

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

  /**
   * Formata a placa de veículo para os formatos do Brasil ou Mercosul.
   *
   * Este método verifica se a placa é do tipo Brasil (com 3 letras e 4 números) ou Mercosul (com 3 letras, 1 número,
   * 1 letra e 2 números). Em seguida, formata a placa conforme o padrão correspondente.
   *
   * @param {string} placa - A placa a ser formatada. Pode ser no formato Brasil ou Mercosul.
   * @returns {string} - A placa formatada ou uma mensagem de erro se o formato for inválido.
   *
   * @example
   * BrazilFormatUtils.formatarPlaca('ABC1234'); // Retorna 'ABC1234'
   * BrazilFormatUtils.formatarPlaca('ABC1D12'); // Retorna 'ABC11212'
   */
  public static formatarPlaca(placa: string): string {
    try {
      if (this.isPlacaBrasil(placa)) {
        return this.gerarPlacaBrasil(placa, 4);
      } else if (this.isPlacaMercosul(placa)) {
        return this.gerarPlacaMercosul(placa, 4);
      } else {
        return 'Formato inválido';
      }
    } catch (error) {
      console.error('Error in formatarPlaca:', error);
      return 'Erro na formatação';
    }
  }

  /**
   * Verifica se a placa fornecida está no formato de placa Brasil.
   *
   * O formato de placa Brasil é composto por 3 letras seguidas de 4 números (exemplo: ABC1234).
   *
   * @param {string} placa - A placa a ser verificada.
   * @returns {boolean} - Retorna `true` se a placa estiver no formato Brasil, caso contrário `false`.
   *
   * @example
   * BrazilFormatUtils.isPlacaBrasil('ABC1234'); // Retorna true
   */
  private static isPlacaBrasil(placa: string): boolean {
    return /^[A-Z]{3}\d{4}$/.test(placa);
  }

  /**
   * Verifica se a placa fornecida está no formato de placa Mercosul.
   *
   * O formato de placa Mercosul é composto por 3 letras, 1 número, 1 letra e 2 números (exemplo: ABC1D12).
   *
   * @param {string} placa - A placa a ser verificada.
   * @returns {boolean} - Retorna `true` se a placa estiver no formato Mercosul, caso contrário `false`.
   *
   * @example
   * BrazilFormatUtils.isPlacaMercosul('ABC1D12'); // Retorna true
   */
  private static isPlacaMercosul(placa: string): boolean {
    return /^[A-Z]{3}\d[A-Z]\d{2}$/.test(placa);
  }

  /**
   * Gera a placa no formato Brasil, substituindo o dígito numérico pela letra correspondente.
   *
   * Este método pega a placa e substitui o dígito numérico pela letra correspondente no Map de `codigoPlacaMercosul`.
   *
   * @param {string} placa - A placa a ser gerada.
   * @param {number} pos - A posição do dígito que deve ser substituído pela letra.
   * @returns {string} - A placa gerada com a letra correspondente.
   *
   * @example
   * BrazilFormatUtils.gerarPlacaBrasil('ABC1234', 4); // Retorna 'ABC1234'
   */
  private static gerarPlacaBrasil(placa: string, pos: number): string {
    return (
        placa.substring(0, pos) +
        this.codigoPlacaMercosul.get(parseInt(placa[pos])) +
        placa.substring(pos + 1)
    );
  }

  /**
   * Gera a placa no formato Mercosul, substituindo a letra pela correspondente ao número.
   *
   * Este método pega a letra da placa e substitui por um número correspondente, de acordo com o Map de `codigoPlacaMercosul`.
   *
   * @param {string} placa - A placa a ser gerada.
   * @param {number} pos - A posição da letra que deve ser substituída pelo número.
   * @returns {string} - A placa gerada com o número correspondente à letra.
   *
   * @example
   * BrazilFormatUtils.gerarPlacaMercosul('ABC1D12', 4); // Retorna 'ABC11212'
   */
  private static gerarPlacaMercosul(placa: string, pos: number): string {
    const letra = placa[pos];
    let segundoDigito: number | undefined;

    // Encontrar o valor do segundo dígito correspondente à letra
    for (let [key, value] of this.codigoPlacaMercosul) {
      if (value === letra) {
        segundoDigito = key;
        break;
      }
    }

    if (segundoDigito !== undefined) {
      return placa.substring(0, pos) + segundoDigito + placa.substring(pos + 1);
    } else {
      throw new Error('Letra não encontrada para o segundo dígito');
    }
  }

}
