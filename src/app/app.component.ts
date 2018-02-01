import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, ModalController } from 'ionic-angular';
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
import { UserDataProvider } from '../providers/user-data/user-data';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any;
  @ViewChild(Nav) nav: Nav;

  constructor(    
    public events: Events,
    public userData: UserDataProvider,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public modal: ModalController) {

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
  }


  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  openConfigModal(){
    const ConfigModal = this.modal.create('ConfigPage');

    ConfigModal.present();
  }
  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
}
