import { Component, OnInit, ViewChildren, Directive, QueryList, ElementRef, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { Inputs } from '.././home/inputs';
import { UserDataProvider, DataList } from '../../providers/user-data/user-data';
import {Focuser} from "../../directives/focuser/focuser";

// @Directive({
//   selector: '[focusMe]'
// })
// export class FocusMe {
//     constructor(private elementRef: ElementRef) {}
//     ngAfterViewInit() {
//       // set focus when element first appears
//       this.setFocus();
//     }
//     setFocus() {
//       this.elementRef.nativeElement.focus();
//     }
// }

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // directives: ['Focuser']
})
export class HomePage {
  rowCount:number;
  homeData: DataList;
  formData: FormGroup;
  titulo: string;
  unidade: string = 'mL/min';
  inputNumber: string = 'input';
  status: number;
  index: any;
  public homeForm: FormGroup;
  // @ViewChild(FocusMe) child;
  
  constructor(
    public navCtrl: NavController,
    public userData: UserDataProvider,
    private formBuilder: FormBuilder,
  ) {

    this.homeForm = new FormGroup({
      bicos: new FormArray([
        new FormControl(null)
      ])
  });

  }

  @ViewChildren('input') childChildren: QueryList<ElementRef>;

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
      this.status = this.homeData.referencia

      for(let i=1;i<this.rowCount;i++){
        this.addInputs();
      }

    });

  
  }

//   initInput() {
//     return this.formBuilder.group({
//         input: ['', Validators.required],
//     });
// }

  addInputs() {
    // this.homeForm.controls
    // .bicos.push(new FormControl(null));

    (<FormArray>this.homeForm.controls['bicos'])
    .push(new FormControl(null));
    }

    activateInput(index){
     
      // focus.focus()
      
      // let element = document.getElementById('input'+index);
      // console.log(element)
      // element.focus();
      // document.getElementById('input'+index).setFocus();
    }

    // focusInput() {
    
  //   this.child = 'input1'
  //   console.clear();
  //   console.log(this.child);
  //   this.child.setFocus();
  // }
//   getValue(index){
//     this.index = document.write(eval(index));
//     console.log(this.index)
//     // return this.value;
// }
  
//   setFocus(index){
//     this.inputNumber = 'input'+index;
//     console.log(document.getElementById(index))
//     // this.NBicoInput.setFocus();
//   }
}

