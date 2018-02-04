import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, ModalController, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

// Pages
import { TabsPage } from '../pages/tabs/tabs';
import { ConfigPage } from '../pages/config/config';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { SavePage } from '../pages/save/save';
import { LoadPage } from '../pages/load/load';
import { TutorialPage } from '../pages/tutorial/tutorial';


//Providers
import { UserDataProvider, DataList } from '../providers/user-data/user-data';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any;
  Data: DataList
  @ViewChild(Nav) nav: Nav;

  constructor(    
    public events: Events,
    public userData: UserDataProvider,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public modal: ModalController,
    public alertCtrl: AlertController) {

      // Check if the user has already seen the tutorial
      this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
      });

      statusBar.styleDefault();
      splashScreen.hide();

      this.userData.getData().then((value) => {
        this.Data = value;
      });
  }
  
  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  openConfigModal(){
    const ConfigModal = this.modal.create('ConfigPage');

    ConfigModal.onDidDismiss((configData) => {
    this.userData.setData(configData);
    this.Data = configData;
  
    });
    console.log(this.Data);
    ConfigModal.present();
  }

  openNewModal(){
    let alert = this.alertCtrl.create({
      title: 'Deseja salvar antes de continuar?',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            const newModal = this.modal.create('NewPage');
            newModal.onDidDismiss((newData) => {
              if(newData != undefined){
                
            this.userData.setData(newData);
            this.Data = newData;}
            });
            
            newModal.present();
          }
        },
        {
          text: 'Salvar',
          handler: () => {
            const newModal = this.modal.create('NewPage');
            newModal.onDidDismiss((newData) => {
              if(newData != undefined){
                
            this.userData.setData(newData);
            this.Data = newData;}
            });
            newModal.present();
          }
        }
      ]
    });
    alert.present();
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
}
