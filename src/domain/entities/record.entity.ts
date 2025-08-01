/**
 * Entidad que representa un registro de temperatura en una zona geográfica específica.
 */
export class Record {
  /**
   * Crea una nueva instancia de la entidad Record.
   *
   * @param {string} zone - Zona geográfica donde se tomó el registro.
   * @param {Date} timestamp - Fecha y hora en la que se realizó el registro.
   * @param {number} temperature - Temperatura registrada en grados Celsius.
   */
  constructor(
    public zone: string,
    public timestamp: Date,
    public temperature: number,
  ) {}
}
