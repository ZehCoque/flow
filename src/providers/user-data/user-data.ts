import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

const Data = 'Data';
const Inputs = 'Inputs';

@Injectable()
export class UserDataProvider {
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  

  constructor(public storage: Storage) {
    console.log('Hello UserDataProvider Provider');
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };

  getData() {
    return this.storage.get(Data);
  }

  setData(value) {
    this.storage.set(Data,value).then((value) => {
      return value;
    });
  }

  setInputs(value){
    this.storage.set(Inputs,value).then((value) => {
      return value;
    });
  }

  getInputs() {
    return this.storage.get(Inputs);
  }

}

export class DataList{
  titulo: string;
  numeroBicos: number;
  referencia: number;
  erroAdm: number;
  unidade: string;
  coleta: string;
}

export class HomeInputData {
homeInputs: number[];
}