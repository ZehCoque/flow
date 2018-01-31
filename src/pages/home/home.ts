import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Inputs:number[];
  rowCount = 7;
  constructor(public navCtrl: NavController) {
   
  }

  ionViewWillEnter(){
    this.Inputs =[];
  }

  addInput(Input){
    this.Inputs.push(Input);
  }
}

