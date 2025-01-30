/**
 * Classe utilitária para conversão de unidades de tempo.
 */
export class TimeUtils {

  /**
   * Converte segundos para horas.
   *
   * @param {number} seconds - O valor em segundos a ser convertido.
   * @returns {number} - O valor convertido em horas.
   * @throws {Error} - Lança um erro se o valor fornecido não for um número.
   *
   * @example
   * TimeUtils.segundosParaHoras(3600); // Retorna 1
   */
  public static segundosParaHoras(seconds: number): number {
    try {
      if (typeof seconds !== 'number') {
        console.error('O valor deve ser um número.');
        return 0;
      }

      return seconds / 3600;
    } catch (error) {
      console.error('Error in segundosParaHoras:', error);
      return 0;
    }
  }

  /**
   * Converte segundos para minutos.
   *
   * @param {number} seconds - O valor em segundos a ser convertido.
   * @returns {number} - O valor convertido em minutos.
   * @throws {Error} - Lança um erro se o valor fornecido não for um número.
   *
   * @example
   * TimeUtils.segundosParaMinutos(120); // Retorna 2
   */
  public static segundosParaMinutos(seconds: number): number {
    try {
      if (typeof seconds !== 'number') {
        console.error('O valor deve ser um número.');
      }

      return seconds / 60;
    } catch (error) {
      console.error('Error in segundosParaMinutos:', error);
      return 0;
    }
  }

  /**
   * Converte horas para segundos.
   *
   * @param {number} hours - O valor em horas a ser convertido.
   * @returns {number} - O valor convertido em segundos.
   * @throws {Error} - Lança um erro se o valor fornecido não for um número.
   *
   * @example
   * TimeUtils.horasParaSegundos(1); // Retorna 3600
   */
  public static horasParaSegundos(hours: number): number {
    try {
      if (typeof hours !== 'number') {
        console.error('O valor deve ser um número.');
      }

      return hours * 3600;
    } catch (error) {
      console.error('Error in horasParaSegundos:', error);
      return 0;
    }
  }

  /**
   * Converte horas para minutos.
   *
   * @param {number} hours - O valor em horas a ser convertido.
   * @returns {number} - O valor convertido em minutos.
   * @throws {Error} - Lança um erro se o valor fornecido não for um número.
   *
   * @example
   * TimeUtils.horasParaMinutos(1); // Retorna 60
   */
  public static horasParaMinutos(hours: number): number {
    try {
      if (typeof hours !== 'number') {
        console.error('O valor deve ser um número.');
      }

      return hours * 60;
    } catch (error) {
      console.error('Error in horasParaMinutos:', error);
      return 0;
    }
  }

  /**
   * Converte minutos para horas.
   *
   * @param {number} minutes - O valor em minutos a ser convertido.
   * @returns {number} - O valor convertido em horas.
   * @throws {Error} - Lança um erro se o valor fornecido não for um número.
   *
   * @example
   * TimeUtils.minutosParaHoras(120); // Retorna 2
   */
  public static minutosParaHoras(minutes: number): number {
    try {
      if (typeof minutes !== 'number') {
        console.error('O valor deve ser um número.');
      }

      return minutes / 60;
    } catch (error) {
      console.error('Error in minutosParaHoras:', error);
      return 0;
    }
  }

  /**
   * Converte minutos para segundos.
   *
   * @param {number} minutes - O valor em minutos a ser convertido.
   * @returns {number} - O valor convertido em segundos.
   * @throws {Error} - Lança um erro se o valor fornecido não for um número.
   *
   * @example
   * TimeUtils.minutosParaSegundos(2); // Retorna 120
   */
  public static minutosParaSegundos(minutes: number): number {
    try {
      if (typeof minutes !== 'number') {
        console.error('O valor deve ser um número.');
      }

      return minutes * 60;
    } catch (error) {
      console.error('Error in minutosParaSegundos:', error);
      return 0;
    }
  }
}
