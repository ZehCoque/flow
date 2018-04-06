import { Component, ViewChildren, QueryList, NgZone} from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { UserDataProvider, DataList, HomeInputData } from '../../providers/user-data/user-data';
import { BLE } from '@ionic-native/ble';

//Validators
import { HomeInputValidator } from  '../../validators/homeInput';

const SERVICE = 'ffe0';
const CHARACTERISTIC = 'ffe1';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  savedInputs: HomeInputData;
  rowCount:number;
  homeData: DataList;
  formData: FormGroup;
  titulo: string;
  unidade: string = 'mL/min';
  inputNumber: string = 'input';
  index: any;
  device: any;
  peripheral: any ={};
  public homeForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public userData: UserDataProvider,
    public ble: BLE,
    public alertCtrl: AlertController,
    private ngZone: NgZone,
  ) {

    this.homeForm = new FormGroup({
      bicos: new FormArray([]),
  });

  }

  @ViewChildren('inputs') inputs: QueryList<any>;

  ionViewWillEnter(){
    this.userData.getData().then((value) => {
      this.homeData = value;
      this.rowCount = this.homeData.numeroBicos;
      this.titulo = this.homeData.titulo;
      if (this.homeData.unidade == "mm"){
        this.unidade = 'mL/min';
      }
      if (this.homeData.unidade == "gal"){
        this.unidade = 'gal/min';
      }
      if (this.homeData.unidade == "oz"){
        this.unidade = 'oz/min';
      }

      }); 

      this.userData.getInputs().then((value) => {
        this.savedInputs = value;
        for(let i=0;i<this.rowCount;i++){
        if(this.savedInputs == undefined){
        (<FormArray>this.homeForm.controls['bicos'])
        .push(new FormControl([null],{ updateOn: 'blur' }));
        }
        else{
          (<FormArray>this.homeForm.controls['bicos'])
          .push(new FormControl([this.savedInputs[i]],{ updateOn: 'blur' }));
          if (this.homeForm.controls['bicos'].value[i] != 0 || 
          this.homeForm.controls['bicos'].value[i] != null)  {
            (<FormArray>this.homeForm.controls['bicos']).controls[i].markAsTouched();
          }
        }
      }
    });
      this.homeForm.controls.bicos.valueChanges.subscribe(data =>{
        this.userData.setInputs(data);
    });
    
    // BLE
    this.device = this.userData.getBLE_saved_device();

    // This is not a promise, the device can call disconnect after it connects, so it's an observable
    this.ble.connect(this.device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected')
    );
  }

    activateInput(index){
      this.inputs.toArray()[index].setFocus();
    }

    // CONFIGURAÇÕES BLE
    onConnected(peripheral) {

      this.peripheral = peripheral;
  
      // Subscribe for notifications when the value changes
      this.ble.startNotification(this.peripheral.id, SERVICE, CHARACTERISTIC).subscribe(
        data => this.onValueChange(data),
        () => this.showAlert('Erro Inesperado', 'Impossível receber valores do dispositivo Bluetooth')
      )
  
      // Read the current value
      this.ble.read(this.peripheral.id, SERVICE, CHARACTERISTIC).then(
        data => this.onValueChange(data),
        () => this.showAlert('Erro Inespera', 'Impossível receber valor do dispositivo Bluetooth')
      )
      
    }

    onValueChange(buffer:ArrayBuffer) {

      // Value is a 4 byte floating point value
      var data = new Float32Array(buffer);
      console.log(data[0]);
  
      this.ngZone.run(() => {
        // this.value = data[0];
      });
  
    }

    showAlert(title, message) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }

}

