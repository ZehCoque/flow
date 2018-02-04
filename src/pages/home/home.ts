import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//Providers
import { UserDataProvider, DataList } from '../../providers/user-data/user-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Inputs:number[];
  rowCount:number;
  homeData: DataList;

  constructor(
    public navCtrl: NavController,
    public userData: UserDataProvider
  ) {

  }

  // ionViewWillEnter(){
  //   this.Inputs =[];
  //   this.userData.getData().then((value) => {
  //     this.homeData = value;
  //     this.rowCount = this.homeData.numeroBicos;
  //   });
  // }

  addInput(Input){
    this.Inputs.push(Input);
  }
}

