import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// /**
//  * Generated class for the MorePage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @IonicPage()
// @Component({
//   selector: 'page-more',
//   templateUrl: 'more.html',
// })
// export class MorePage {

//   constructor(public navCtrl: NavController, public navParams: NavParams) {
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad MorePage');
//   }

// }

@Component({
  selector: "more-page",
  templateUrl: "more.html",
})
export class MorePage {

  public anArray:any=[];

  public lenofarr:any;
  btn:any
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log('this.anArray',this.anArray);
    this.btn=false;
    this.data=false;
  }
  goTo(){
    console.log('this.anArray',this.anArray);
    this.data=true;
  }
  Add(key){
      console.log('key',key)
      for(let i =0;i<key;i++){
        this.anArray.push({label:'Name',value:''});
      }
      console.log('this.anArray',this.anArray);
      this.btn=true;
  }
}
