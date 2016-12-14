import Sensor from '../model/Sensor'

import mqtt from 'mqtt'


export function initConnection(chemin, addSensor, updateSensor) {
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
          addSensor(s);
          // console.log(`Creation d'un sensor : ${s}`);
      } catch (e) {
        // console.log(`Error create sensor : ${e}`);
      }
    }
    else {
      console.log("Update");
      const up = {
        id,
        value
      }
      updateSensor(up);
    }
  });
}
