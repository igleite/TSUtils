/**
 * Classe utilitária para manipulação de datas.
 */
export class DateUtils {

  /**
   * Converte uma data UTC para a data local do usuário.
   *
   * @param {Date} date - A data UTC a ser convertida.
   * @returns {Date} - A data convertida para o horário local.
   *
   * @example
   * const utcDate = new Date('2023-09-21T10:00:00Z');
   * const localDate = DateUtils.convertUTCDateToLocalDate(utcDate);
   * console.log(localDate); // Exibe a data convertida para o horário local
   */
  public static convertUTCDateToLocalDate(date: Date): Date {
    try {
      const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
      const offset = date.getTimezoneOffset() / 60;
      const hours = date.getHours();
      newDate.setHours(hours - offset);
      return newDate;
    } catch (error) {
      console.error('Error in convertUTCDateToLocalDate:', error);
      return new Date();
    }
  }

  /**
   * Converte uma string representando uma data em um objeto Date.
   *
   * @param {string} date - A string a ser convertida para uma data.
   * @returns {Date} - O objeto Date correspondente à string fornecida.
   *
   * @example
   * const dateString = "2023-09-21";
   * const dateObject = DateUtils.convertStrinToDate(dateString);
   * console.log(dateObject); // Exibe a data como um objeto Date
   */
  public static convertStrinToDate(date: string): Date {
    try {
      return new Date(date);
    } catch (error) {
      console.error('Error in convertStrinToDate:', error);
      return new Date();
    }
  }

  /**
   * Formata uma data para ser utilizada em um componente de seletor de data.
   *
   * @param {Date} myDate - A data a ser formatada.
   * @returns {Object} - Um objeto contendo a data formatada.
   *
   * @example
   * const myDate = new Date('2023-09-21');
   * const pickerDate = DateUtils.setMyDatePickerDate(myDate);
   * console.log(pickerDate); // { date: { year: 2023, month: 9, day: 21 } }
   */
  public static setMyDatePickerDate(myDate: Date): { date: { year: number, month: number, day: number } } {
    try {
      const pickerDate = new Date(myDate);
      return {date: {year: pickerDate.getFullYear(), month: pickerDate.getMonth() + 1, day: pickerDate.getDate()}};
    } catch (error) {
      console.error('Error in setMyDatePickerDate:', error);
      return {date: {year: 0, month: 0, day: 0}};
    }
  }

  /**
   * Converte uma data formatada de um seletor de data para um objeto Date.
   *
   * @param {Object} myDate - O objeto contendo a data formatada.
   * @returns {Date} - O objeto Date correspondente à data formatada.
   *
   * @example
   * const pickerDate = { date: { year: 2023, month: 9, day: 21 } };
   * const dateObject = DateUtils.getMyDatePickerDate(pickerDate);
   * console.log(dateObject); // Exibe a data como um objeto Date
   */
  public static getMyDatePickerDate(myDate: any): Date {
    try {
      return new Date(myDate.date.year, myDate.date.month - 1, myDate.date.day);
    } catch (error) {
      console.error('Error in getMyDatePickerDate:', error);
      return new Date();
    }
  }

  /**
   * Define o final do dia para uma data fornecida, configurando horas, minutos, segundos e milissegundos.
   *
   * @param {Date} myDate - A data para a qual o final do dia deve ser definido.
   * @returns {Date} - A data ajustada para o final do dia.
   *
   * @example
   * const myDate = new Date('2023-09-21');
   * const endOfDay = DateUtils.toEndOfDay(myDate);
   * console.log(endOfDay); // Exibe a data com hora ajustada para 23:59:59.999
   */
  public static toEndOfDay(myDate: Date): Date {
    try {
      const endOfDay = new Date(myDate);
      return new Date(endOfDay.getFullYear(), endOfDay.getMonth(), endOfDay.getDate() + 1, 23, 59, 59, 999);
    } catch (error) {
      console.error('Error in toEndOfDay:', error);
      return new Date();
    }
  }

  /**
   * Verifica se o objeto fornecido é uma data válida.
   *
   * @param {any} obj - O objeto a ser verificado.
   * @returns {boolean} - Verdadeiro se o objeto for uma data válida; caso contrário, falso.
   */
  public static isDate(obj: any): boolean {
    try {
      const date = new Date(obj);
      return !isNaN(date.getTime());
    } catch (error) {
      console.error('Error in isDate:', error);
      return false;
    }
  }

  /**
   * Analisa um objeto e o converte em uma string de data no formato "YYYY-MM-DD".
   *
   * @param {any} obj - O objeto a ser analisado.
   * @returns {string} - A string de data formatada.
   */
  public static parseDate(obj: any): string {
    try {
      // Moment.js
      if (obj.dd instanceof Date) {
        const d = obj.dd as Date;
        const month = +d.getMonth() + 1;
        const day = +d.getDate();
        return `${d.getFullYear()}-${this._formatDayOrMonth(month)}-${this._formatDayOrMonth(day)}`;
      }

      // NgbDateStruct
      if (typeof obj === 'object' && obj.year != null && obj.month != null && obj.day != null) {
        const month = +obj.month;
        const day = +obj.day;
        return `${obj.year}-${this._formatDayOrMonth(month)}-${this._formatDayOrMonth(day)}`;
      }
    } catch (error) {
      console.error('Error in parseDate:', error);
    }
    return obj;
  }

  /**
   * Formata o dia ou mês para adicionar um zero à esquerda se for menor que 10.
   *
   * @param {number} month - O número a ser formatado.
   * @returns {string | number} - O número formatado com ou sem zero à esquerda.
   */
  private static _formatDayOrMonth(month: number): string | number {
    return month < 10 ? `0${month}` : month;
  }

  /**
   * Formata uma data para o padrão "yyyy-MM".
   *
   * @param {Date} date - A data a ser formatada.
   * @returns {string} - A data formatada no padrão "yyyy-MM".
   *
   * @example
   * const date = new Date('2023-09-21');
   * const formatted = DateUtils.getYearMonthString(date);
   * console.log(formatted); // "2023-09"
   */
  public static getYearMonthString(date: Date): string {
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth() retorna 0-11
      return `${year}-${this._formatDayOrMonth(month)}`;
    } catch (error) {
      console.error('Error in getYearMonthString:', error);
      return '';
    }
  }
}
