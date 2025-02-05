import {StringUtils} from "../string/string-utils";

/**
 * Fornece métodos para codificação e decodificação de strings em um formato Base64 seguro para URLs.
 * A solução foi copiada de: [Stack Overflow](https://stackoverflow.com/questions/11743160/how-do-i-encode-and-decode-a-base64-string).
 *
 * @see https://stackoverflow.com/a/60738564
 */
export class Base64UrlUtils {

  /**
   * Codifica a string especificada em um formato Base64 seguro para URLs.
   *
   * @example
   * ```javascript
   * const encoded = Base64Url.encode('Hello, World!');
   * console.log(encoded); // Saída: SGVsbG8sIFdvcmxkIQ
   * ```
   *
   * @param {string} text - A string a ser codificada.
   * @returns {string} Uma string codificada em formato Base64 seguro para URLs.
   */
  public static encode(text: string): string {
    try {
      if (StringUtils.isNullOrEmpty(text)) {
        return StringUtils.Empty;
      }

      const base64 = btoa(unescape(encodeURIComponent(text))); // Converte para Base64
      return base64.replace(/=+$/, '') // Remove '=' no final
        .replace(/\+/g, '-') // Substitui '+' por '-'
        .replace(/\//g, '_'); // Substitui '/' por '_'
    } catch {
      return StringUtils.Empty;
    }
  }

  /**
   * Decodifica a string codificada em formato Base64 seguro para URLs.
   *
   * @example
   * const decoded = Base64Url.decode('SGVsbG8sIFdvcmxkIQ');
   * console.log(decoded); // Saída: Hello, World!
   *
   * @param {string} text - A string codificada a ser decodificada.
   * @returns {string} A string original decodificada.
   */
  public static decode(text: string): string {
    try {
      if (StringUtils.isNullOrEmpty(text)) {
        return StringUtils.Empty;
      }

      let base64 = text.replace(/-/g, '+') // Substitui '-' por '+'
        .replace(/_/g, '/'); // Substitui '_' por '/'
      switch (base64.length % 4) {
        case 2:
          base64 += '==';
          break;
        case 3:
          base64 += '=';
          break;
      }
      return decodeURIComponent(escape(atob(base64))); // Decodifica de Base64
    } catch {
      return StringUtils.Empty;
    }
  }
}
