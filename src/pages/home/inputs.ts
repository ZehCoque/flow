import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class Inputs{
    numberImputs: number;
    inputs: string[];
    i:number;
    text = 'input'
    constructor(
      public navCtrl: NavController,
      public userData: UserDataProvider,
      private formBuilder: FormBuilder,
    ) {
      this.userData.getData().then((value) => {
        this.numberImputs = value.numeroBicos;
    });
    for(this.i=1;this.i<=this.numberImputs;this.i++){
      this.inputs.push(this.text+this.i);
      console.log(this.inputs);
    }
  }
  
  }