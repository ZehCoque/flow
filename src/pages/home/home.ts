import { Component, OnInit, Renderer, ViewChildren, Directive, QueryList, ElementRef, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserDataProvider, DataList, HomeInputData } from '../../providers/user-data/user-data';
import {FocusDirective} from "../../directives/focuser/focuser";
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
    private formBuilder: FormBuilder,
    public renderer: Renderer,
    public elementRef: ElementRef
  ) {

    this.homeForm = new FormGroup({
      bicos: new FormArray([],[HomeInputValidator.isValid])
  });
  }

  // @ViewChildren('homeForm') bicos: QueryList<ElementRef>;

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

      for(let i=0;i<this.rowCount;i++){
        if(this.savedInputs == undefined){
        (<FormArray>this.homeForm.controls['bicos'])
        .push(new FormControl(null));
        }
        else{
          (<FormArray>this.homeForm.controls['bicos'])
          .push(new FormControl(this.savedInputs[i]));
        }
      }
    });
 
    this.homeForm.controls.bicos.valueChanges.subscribe(data =>{
      this.userData.setInputs(data);
      console.log(this.homeForm.controls['bicos'].valid);
    });
    
  }

    activateInput(index){

      // this.renderer.invokeElementMethod(this.homeForm.controls.bicos.nativeElement,    
      //   'focus');

      // this.bicos.first().nativeElement.focus();
      // this.renderer.invokeElementMethod(
      //   this.elementRef.nativeElement, 'focus', []);
      //   console.log( this.renderer.invokeElementMethod(
      //     this.elementRef.nativeElement, 'focus', []))
      // focus.focus()
      
      // let element = document.getElementById('input'+index);
      // console.log(element)
      // element.focus();
      // document.getElementById('input'+index).setFocus();
    }
}

