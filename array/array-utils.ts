import {FieldUtils} from "../field/field-utils";

/**
 * Classe utilitária para manipulação de arrays.
 */
export class ArrayUtils {

  /**
   * Achata uma estrutura de array aninhada em um único array.
   * @template T - O tipo dos elementos no array.
   * @param {any} array - O array a ser achatado.
   * @returns {T[]} - O array achatado.
   *
   * @example
   * const nestedArray = [1, [2, [3, 4]], 5];
   * const flatArray = ArrayUtils.flatMap(nestedArray); // [1, 2, 3, 4, 5]
   */
  protected static flatMap<T>(array: any): T[] {
    const valores: T[] = [];

    /**
     * Achata matrizes aninhadas recursivamente.
     * @param {any[]} arr - A matriz a ser nivelada.
     */
    function percorrerArray(arr: any[]) {
      arr?.forEach(item => {
        if (Array.isArray(item)) {
          percorrerArray(item);
        } else {
          valores.push(item);
        }
      });
    }

    try {
      if (Array.isArray(array)) {
        percorrerArray(array);
      }
      return valores;
    } catch (error) {
      console.error('Error in flatMap:', error);
      return [];
    }
  }

  /**
   * Verifica se algum item da lista atende todas as condições especificadas.
   * @template T - O tipo de objeto contido na lista.
   * @param {T[]} items - A lista de itens a ser verificada.
   * @param {Partial<Record<keyof T, (value: T[keyof T]) => boolean>>} conditions - Um objeto que contém funções de
   * comparação para os campos.
   * @returns {boolean} - Retorna `true` se algum item atender a todas as condições, caso contrário, `false`.
   *
   * @example
   * const items = [
   *   { id: 1, name: 'Item 1', category: 'A' },
   *   { id: 2, name: 'Item 2', category: 'B' }
   * ];
   * const exists = ArrayUtils.anyItemSatisfies(items, {
   *   id: value => value === 1,
   *   category: value => value !== 'A'
   * }); // false
   */
  public static anyItemSatisfies<T>(
    items: T[],
    conditions: Partial<Record<keyof T, (value: T[keyof T]) => boolean>>
  ): boolean {
    try {
      return items.some(item =>
        Object.entries(conditions).every(([key, compare]) => {
          const compareFunction = compare as (value: T[keyof T]) => boolean;
          return typeof compareFunction === 'function' && compareFunction(item[key as keyof T]);
        })
      );
    } catch (error) {
      console.error('Error in anyItemSatisfies:', error);
      return false;
    }
  }

  /**
   * Encontra o primeiro item da lista que satisfaz todas as condições especificadas.
   * @template T - O tipo de objeto contido na lista.
   * @param {T[]} items - A lista de itens a ser verificada.
   * @param {Partial<Record<keyof T, (value: T[keyof T]) => boolean>>} conditions - Um objeto que contém funções de
   * comparação para os campos.
   * @returns {T | undefined} - Retorna o primeiro item que satisfaz todas as condições, ou undefined se nenhum item satisfizer.
   *
   * @example
   * const items = [
   *   { id: 1, name: 'Item 1', category: 'C' },
   *   { id: 2, name: 'Item 2', category: 'B' }
   * ];
   * const itemFound = ArrayUtils.findItemSatisfying(items, {
   *   id: value => value === 1,
   *   category: value => value !== 'A'
   * }); // { id: 1, name: 'Item 1', category: 'C' }
   */
  public static findItemSatisfying<T>(
    items: T[],
    conditions: Partial<Record<keyof T, (value: T[keyof T]) => boolean>>
  ): T | undefined {
    try {
      return items.find(item =>
        Object.entries(conditions).every(([key, compare]) => {
          const compareFunction = compare as (value: T[keyof T]) => boolean;
          return typeof compareFunction === 'function' && compareFunction(item[key as keyof T]);
        })
      );
    } catch (error) {
      console.error('Error in findItemSatisfying:', error);
      return undefined;
    }
  }

  /**
   * Filtra todos os itens da lista que satisfazem todas as condições especificadas.
   * @template T - O tipo de objeto contido na lista.
   * @param {T[]} items - A lista de itens a ser verificada.
   * @param {Partial<Record<keyof T, (value: T[keyof T]) => boolean>>} conditions - Um objeto que contém funções de
   * comparação para os campos.
   * @returns {T[]} - Retorna um array contendo todos os itens que satisfazem todas as condições, ou um array vazio se
   * nenhum item satisfizer.
   *
   * @example
   * const items = [
   *   { id: 1, name: 'Item 1', category: 'A' },
   *   { id: 2, name: 'Item 2', category: 'B' },
   *   { id: 3, name: 'Another Item', category: 'C' }
   * ];
   * const filteredItems = ArrayUtils.filterItemsSatisfying(items, {
   *   name: value => value.includes('Item'),
   *   id: value => value > 1
   * }); // [{ id: 2, name: 'Item 2', category: 'B' }, { id: 3, name: 'Another Item', category: 'C' }]
   */
  protected static filterItemsSatisfying<T>(
    items: T[],
    conditions: Partial<Record<keyof T, (value: T[keyof T]) => boolean>>
  ): T[] {
    try {
      return items.filter(item =>
        Object.entries(conditions).every(([key, compare]) => {
          const compareFunction = compare as (value: T[keyof T]) => boolean;
          return typeof compareFunction === 'function' && compareFunction(item[key as keyof T]);
        })
      );
    } catch (error) {
      console.error('Error in filterItemsSatisfying:', error);
      return [];
    }
  }

  /**
   * Calcula o número total de itens em um array se o array for válido e estiver preenchido.
   * @param {Array<any>} items - O array para contar os itens.
   * @returns {number} O número de itens no array, ou 0 se o array não estiver preenchido.
   * @throws {TypeError} Se o parâmetro não for um array.
   *
   * @example
   * const items = [1, 2, 3];
   * const total = ArrayUtils.totalItems(items); // 3
   */
  protected static totalItems(items: Array<any>): number {
    try {
      if (FieldUtils.hasEmptyFields(items)) {
        return 0;
      }

      if (!Array.isArray(items)) {
        console.error('Itens inválidos');
        return 0;
      }

      return items.length;
    } catch (error) {
      console.error('Error in totalItems:', error);
      return 0;
    }
  }

  /**
   * Verifica se o array está preenchido (ou seja, não é nulo, não é indefinido e contém pelo menos um item).
   * @param {any[]} array - O array a ser verificado.
   * @returns {boolean} - Retorna `true` se o array estiver preenchido, caso contrário, `false`.
   *
   * @example
   * const items = [1, 2, 3];
   * const isFilled = ArrayUtils.isArrayFilled(items); // true
   *
   * const emptyItems = [];
   * const isEmpty = ArrayUtils.isArrayFilled(emptyItems); // false
   */
  public static isArrayFilled(array: any[]): boolean {
    return Array.isArray(array) && array.length > 0;
  }
}
