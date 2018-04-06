
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler, } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { MyApp } from './app.component';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BLE } from '@ionic-native/ble'

import { TabsPage } from '../pages/tabs/tabs';
import { GraphPage } from '../pages/graph/graph';
import { MorePage } from '../pages/more/more';
import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { UserDataProvider } from '../providers/user-data/user-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GraphPage,
    MorePage,
    TabsPage,
    TutorialPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist: true,
      autoFocusAssist: true
    }),
    ChartsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GraphPage,
    MorePage,
    TabsPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    BLE,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserDataProvider,
    File
  ]
})
export class AppModule {}