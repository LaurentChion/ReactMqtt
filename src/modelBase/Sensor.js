import { Data, Datum, TimeSeries } from './Data';

import {
  SensorType,
  TEMPERATURE,
  HUMIDITY,
  LIGHT,
  SWITCH,
  DOOR,
  FAN_SPEED,
  POSITIVE_NUMBER,
  PERCENT,
  ON_OFF,
  OPEN_CLOSE} from './SensorType';


/* TODO: Ajouter une classe actif si un objet peut être activable.
                (exemple un intérupteur pour allumé la lumière)
         Ajouter une classe passif si un objet n'est pas activable.
                (exemple une sonde qui envoie une donnée)
*/
export default class Sensor {
  // Déclaré un tableau static
  static getTab() {
    if (!this.tab) {
      this.tab = [];
    }
    return this.tab;
  }

  static idIsValid(id) {
    const tab = Sensor.getTab();
    if (tab.includes(id)) {
      return false;
      //throw Error('Id is already use');
    } else {
      tab.push(id);
      return true;
    }
  }
  constructor(id, name, type, data) {
    // Initialisation du tableau contenant les attributs
    this.attributes = [4];

    // attributions des valeurs
    this.id = id;
    this.name = name;
    this.type = type;
    this.data = data;

    // Si aucune erreur n'as était trouvé, on regarde si l'id est valable
    Sensor.idIsValid(this.id);
  }
  get id() {
    return this.attributes[0] || 'UnknownId';
  }
  set id(val) {
    if (typeof val === 'string') {
      this.attributes[0] = val;
    } else if (typeof val === 'number') {
      const str = val.toString();
      this.attributes[0] = str;
    } else {
      this.attributes[0] = 'UnknownId';
      throw Error('Unknown id');
    }
  }
  set name(val) {
    this.attributes[1] = val;
  }
  get name() {
    return this.attributes[1] || '';
  }
  get type() {
    return this.attributes[2] || 'UNKNOWN';
  }
  set type(val) {
    if (typeof val === 'string') {
      switch (val.toUpperCase()) {
        case 'TEMPERATURE' :
          this.attributes[2] = SensorType[TEMPERATURE];
          break;
        case 'HUMIDITY' :
          this.attributes[2] = SensorType[HUMIDITY];
          break;
        case 'LIGHT' :
          this.attributes[2] = SensorType[LIGHT];
          break;
        case 'SWITCH' :
          this.attributes[2] = SensorType[SWITCH];
          break;
        case 'DOOR' :
          this.attributes[2] = SensorType[DOOR];
          break;
        case 'FAN_SPEED' :
          this.attributes[2] = SensorType[FAN_SPEED];
          break;
        case 'POSITIVE_NUMBER' :
          this.attributes[2] = SensorType[POSITIVE_NUMBER];
          break;
        case 'PERCENT' :
          this.attributes[2] = SensorType[PERCENT];
          break;
        case 'ON_OFF' :
          this.attributes[2] = SensorType[ON_OFF];
          break;
        case 'OPEN_CLOSE' :
          this.attributes[2] = SensorType[OPEN_CLOSE];
          break;
        default :
          this.attributes[2] = null;
          throw Error('Unknown type');
      }
    } else {
      this.attributes[2] = null;
      throw Error('Unknown type');
    }
  }
  set data(val) {
    if (typeof val !== 'undefined') {
      if (typeof val.value !== 'undefined') {
        this.attributes[3] = new Datum(val.value);
      } else if (val.values && val.labels) {
        this.attributes[3] = new TimeSeries(val.values, val.labels);
      } else {
        this.attributes[3] = new Data();
        throw Error('Invalid data length');
      }
    } else {
      this.attributes[3] = new Data();
      throw Error('Invalid data');
    }
  }
  get data() {
    return this.attributes[3] || 'No Data';
  }
  toString() {
    return (`(${this.id}, ${this.name}, ${this.type}, ${this.data})`);
  }
}
