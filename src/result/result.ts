/**
 * Classe que representa falhas de validação.
 */
export class ValidationFailure {
    /**
     * Cria uma instância de `ValidationFailure`.
     *
     * @param {string} propertyName - O nome da propriedade que falhou na validação.
     * @param {string} errorMessage - A mensagem de erro associada à falha de validação.
     */
    constructor(public propertyName: string, public errorMessage: string) {}
}

/**
 * Classe `Result` para encapsular o sucesso ou falha de uma operação.
 *
 * @template T - Tipo de dado que pode ser retornado em caso de sucesso, o padrão é `null`.
 */
export class Result<T = null> {
    /**
     * Cria uma instância de `Result`.
     *
     * @param {boolean} succeeded - Indica se a operação foi bem-sucedida.
     * @param {T} [data] - Dados retornados em caso de sucesso.
     * @param {ValidationFailure[]} [failures=[]] - Lista de falhas em caso de erro.
     */
    constructor(
        public succeeded: boolean,
        public data?: T,
        public failures: ValidationFailure[] = []
    ) {}

    /**
     * Método estático para criar um `Result` com falhas.
     *
     * Pode receber uma ou mais falhas, sendo elas instâncias de `ValidationFailure` ou strings.
     *
     * @param {...(ValidationFailure | string)} failures - As falhas que ocorreram, podem ser instâncias de `ValidationFailure` ou mensagens de erro como string.
     * @returns {Result<T>} Um novo `Result` indicando falha.
     */
    static False<T>(...failures: (ValidationFailure | string)[]): Result<T> {
        const validationFailures = failures.map((failure) =>
            failure instanceof ValidationFailure
                ? failure
                : new ValidationFailure(failure, 'Invalid value')
        )
        return new Result(false, null as T, validationFailures)
    }

    /**
     * Método estático para criar um `Result` com sucesso.
     *
     * @param {T} [data] - Dados retornados em caso de sucesso.
     * @returns {Result<T>} Um novo `Result` indicando sucesso.
     */
    static True<T>(data?: T): Result<T> {
        return new Result(true, data)
    }

    /**
     * Verifica se o resultado foi bem-sucedido.
     *
     * @returns {boolean} Retorna `true` se o resultado for sucesso.
     */
    isSuccess(): boolean {
        return this.succeeded
    }

    /**
     * Verifica se o resultado foi uma falha.
     *
     * @returns {boolean} Retorna `true` se o resultado for uma falha.
     */
    isFailure(): boolean {
        return !this.succeeded
    }

    /**
     * Retorna os erros associados ao resultado, se houver falhas.
     *
     * @returns {ValidationFailure[]} A lista de falhas de validação.
     */
    getErrors(): ValidationFailure[] {
        return this.failures
    }

    /**
     * Retorna os dados associados ao resultado, se houver sucesso.
     *
     * @returns {T | undefined} Os dados retornados em caso de sucesso ou `undefined` se não houver dados.
     */
    getData(): T | undefined {
        return this.data
    }
}
