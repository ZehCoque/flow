import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, 
  ModalController, AlertController, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

// Pages
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { File } from '@ionic-native/file';

//Providers
import { UserDataProvider, DataList } from '../providers/user-data/user-data';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  numeroBicosDefault: number = 102;
  referenciaDefault: number = 400;
  erroAdmDefault: number = 10;
  unidade: string = "mm";
  coleta: string = "bt";
  rootPage:any;
  Data: DataList;
  filename: string;
  dirPath;
  result;
  configFolder;
  dataFolder;

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
    public alertCtrl: AlertController,
    public file: File,
    public toastCrtl: ToastController) {
      this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
      });

      if (this.result == null){
        this.result = this.file.createDir(this.file.externalRootDirectory,'medidordefluxo',true);
        if (this.configFolder == null){
          this.configFolder = this.file.createDir((this.file.externalRootDirectory + 'medidordefluxo'),'config',true);
        }
        if (this.dataFolder == null){
          this.dataFolder = this.file.createDir((this.file.externalRootDirectory + 'medidordefluxo'),'data',true);
        }
      }

      statusBar.styleDefault();
      splashScreen.hide();

      this.userData.getData().then((value) => {
      this.Data = value;
      }).catch(error => {
        this.Data.coleta = this.coleta;
        this.Data.erroAdm = this.erroAdmDefault;
        this.Data.numeroBicos = this.numeroBicosDefault;
        this.Data.referencia = this.referenciaDefault;
        this.Data.titulo = "Ensaio1";
        this.Data.unidade = this.unidade;
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
    this.nav.setRoot(TabsPage);
    });
    ConfigModal.present();
  }
  
  save() {
    this.filename = this.Data.titulo;
    //Save inputs
    this.userData.getInputs().then((inputs) => {
      this.dataFolder.then(data =>{
        this.dirPath = data.toURL();
        this.file.writeFile(this.dirPath, (this.Data.titulo + '.csv'), String(inputs), {replace:true});
        let savetoast = this.toastCrtl.create({
          message: this.filename + " salvo com sucesso!",
          duration: 3000,
          position: 'bottom'
        })
        savetoast.present();
      }
    ).catch(error =>
    {
        let errorAlert = this.alertCtrl.create({
          title: "Erro: Diretório não encontrado."
        })
        errorAlert.present();
    })
    })

    //Save Configurations
    this.userData.getData().then((config) =>{
      let configData = [config.titulo, config.numeroBicos,config.erroAdm, 
      config.referencia, config.unidade,config.coleta];
      this.configFolder.then(data =>{
        this.dirPath = data.toURL();
        this.file.writeFile(this.dirPath, (this.Data.titulo + '.config' + '.csv'), String(configData), {replace:true});
      }
    ).catch(error =>
    {
        let errorAlert = this.alertCtrl.create({
          title: "Erro: Diretório não encontrado."
        })
        errorAlert.present();
    })
    })
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
                this.userData.setInputs(null);
                this.userData.setData(newData);
                this.Data = newData;}
                this.nav.setRoot(TabsPage);
            });
            
            newModal.present();
          }
        },
        {
          text: 'Salvar',
          handler: () => { 
            this.save();           
            const newModal = this.modal.create('NewPage');
            newModal.onDidDismiss((newData) => { 
                  
            if(newData != undefined){
              this.userData.setInputs(null);
              this.userData.setData(newData);
              this.Data = newData;}
              this.nav.setRoot(TabsPage);
            });
            newModal.present();
          }
        }
      ]
    });
    alert.present();
  }

  saveInputs() {

    let alert = this.alertCtrl.create({
      title: 'Deseja salvar?',
      buttons: [
        {
          text: 'Salvar',
          handler: () => {
            this.save();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

  loadInputs() {
    const LoadModal = this.modal.create('LoadPage');
    LoadModal.onDidDismiss((configData) => {
      this.Data = configData;
      this.nav.setRoot(TabsPage);
      });
    LoadModal.present();
  }
  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
}
