import Sensor from '../model/Sensor'

import mqtt from 'mqtt'

import {addAction, updateAction} from '../redux/actions';
import {store} from '../index.js'

export function initConnection(chemin) {
  // connection
  //console.log("connexion en cours ...");
  const clientMQTT = mqtt.connect('mqtt://'+chemin);
  //console.log("inscription à # en cours ...");
  clientMQTT.subscribe('#');

  clientMQTT.on('message', (topic, message) => {

    // récupération des valeurs
    const json = JSON.parse(message)
    const split = topic.split("/");
    const id =`${split[1]}`;
    const value = `${json.value}`;
    const data = {value: value};

    // si le sensor existe déja
    if(Sensor.idIsValid(id)) {
      try {
        const s = new Sensor(split[1], split[1], json.type, data);
          //console.log(`Creation d'un sensor : ${s}`);
          store.dispatch(addAction(s));
      } catch (e) {
        // console.log(`Error create sensor : ${e}`);
      }
    }
    else {
      //console.log("Update");
      store.dispatch(updateAction(id, value));
    }
  });
}
