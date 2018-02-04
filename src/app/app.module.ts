
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { TimesPipe } from './iterable.pipe';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { GraphPage } from '../pages/graph/graph';
import { MorePage } from '../pages/more/more';
import { HomePage } from '../pages/home/home';
// import { ConfigPage } from '../pages/config/config';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { SavePage } from '../pages/save/save';
import { LoadPage } from '../pages/load/load';
import { TutorialPage } from '../pages/tutorial/tutorial';
// import { FieldErrorDisplayComponent } from '../pages/field-error-display-component/field-error-display-component';
import { UserDataProvider } from '../providers/user-data/user-data';

@NgModule({
  declarations: [
    MyApp,
    // ConfigPage,
    BluetoothPage,
    HomePage,
    GraphPage,
    MorePage,
    SavePage,
    LoadPage,
    TabsPage,
    TutorialPage,
    // FieldErrorDisplayComponent,
    TimesPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GraphPage,
    MorePage,
    // FieldErrorDisplayComponent,
    // ConfigPage,
    BluetoothPage,
    SavePage,
    LoadPage,
    TabsPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserDataProvider,
    File
  ]
})
export class AppModule {}