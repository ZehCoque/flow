import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
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
  rootPage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;

  appPages: PageInterface[] = [
    { title: 'Configurações', name: 'TabsPage', component: TabsPage, tabComponent: ConfigPage, index: 0, icon: 'settings' },
    { title: 'Conexão Bluetooth', name: 'TabsPage', component: TabsPage, tabComponent: BluetoothPage, index: 1, icon: 'bluetooth' },
    { title: 'Salvar', name: 'TabsPage', component: TabsPage, tabComponent: SavePage, index: 2, icon: 'archive' },
    { title: 'Carregar', name: 'TabsPage', component: TabsPage, tabComponent: LoadPage, index: 3, icon: 'open' }
  ];
  constructor(    
    public events: Events,
    public userData: UserDataProvider,
    public menu: MenuController,
    public platform: Platform,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar) {

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

  openPage(page: PageInterface) {
    let params = {};

    if (page.index) {
      params = { tabIndex: page.index };
    }

    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
