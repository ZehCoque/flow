import { Component, ViewChildren, QueryList} from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { UserDataProvider, DataList, HomeInputData } from '../../providers/user-data/user-data';

//Validators
import { HomeInputValidator } from  '../../validators/homeInput';

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
  status: number;
  index: any;
  public homeForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public userData: UserDataProvider,
  ) {

    this.homeForm = new FormGroup({
      bicos: new FormArray([])
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

      this.status = this.homeData.referencia;

      }); 

      this.userData.getInputs().then((value) => {
        this.savedInputs = value;
        console.log(this.savedInputs);
        for(let i=0;i<this.rowCount;i++){
        if(this.savedInputs == undefined){
        (<FormArray>this.homeForm.controls['bicos'])
        .push(new FormControl([null,HomeInputValidator.isValid]));
        }
        else{
          (<FormArray>this.homeForm.controls['bicos'])
          .push(new FormControl(this.savedInputs[i]));
        }
      }
    });
 
      this.homeForm.controls.bicos.valueChanges.subscribe(data =>{
      this.userData.setInputs(data);
    });
    
  }

    activateInput(index){
      this.inputs.toArray()[index].setFocus();
    }
}

