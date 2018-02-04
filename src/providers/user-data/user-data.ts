import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

const Data = 'Data';

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
    console.log('getting');
    return this.storage.get(Data);
  }

  setData(value) {
    console.log('setting');
    this.storage.set(Data,value).then((value) => {
      return value;
    });
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