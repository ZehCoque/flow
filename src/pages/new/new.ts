import { Component,Input } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

//Validators
import { NumeroBicosValidator } from  '../../validators/numeroBicos';
import { ErroAdmValidator } from  '../../validators/erroAdm';
import { ReferenciaValidator } from  '../../validators/referencia';
import { ArquivoValidator } from  '../../validators/arquivo';

//Providers
import { UserDataProvider, DataList } from '../../providers/user-data/user-data';

@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {

  titulo: string;
  numeroBicosDefault: number = 102;
  numeroBicos: any;
  referenciaDefault: number = 400;
  referencia: any;
  erroAdmDefault: number = 10;
  erroAdm: any;
  unidade: string = "mm";
  coleta: string = "bt";
  newData: DataList;
  newFormTitulo: FormGroup;
  newFormNumeroBicos: FormGroup;
  newFormReferencia: FormGroup;
  newFormErroAdm: FormGroup;

  constructor(
    private view: ViewController,
    private formBuilder: FormBuilder,
    public storage: Storage,
    public file: File,
    public userData: UserDataProvider
  ) {

    this.newFormTitulo = this.formBuilder.group({
      titulo: ['', Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(20), 
        Validators.pattern('[a-zA-Z0-9éãáÁÉçÇÍíóÓúÚ]*')]), ArquivoValidator.checkFilenameAvailable]
  });

    this.newFormNumeroBicos = this.formBuilder.group({
    numeroBicos: ['', NumeroBicosValidator.isValid]
    });

    this.newFormReferencia = this.formBuilder.group({
      referencia: ['', ReferenciaValidator.isValid]
      });

      this.newFormErroAdm = this.formBuilder.group({
      erroAdm: ['', ErroAdmValidator.isValid]
      });
  }

  onChangeUnidade(SelectedValue){ 
    this.unidade = SelectedValue;
   }

   onChangeColeta(SelectedValue){ 
    this.coleta = SelectedValue;
   }

saveNewModal()
{
  this.titulo = JSON.stringify(this.newFormTitulo.value);
  this.titulo = this.titulo.substring(11);
  this.titulo = this.titulo.replace('"}',"");

  this.numeroBicos = JSON.stringify(this.newFormNumeroBicos.value);
  this.numeroBicos = this.numeroBicos.replace('"}',"");
  this.numeroBicos = this.numeroBicos.replace('{"numeroBicos":"',"");
  this.numeroBicos = this.numeroBicos.replace('}',"");
  this.numeroBicos = this.numeroBicos.replace('{"numeroBicos":',"");
  this.numeroBicos = Number(this.numeroBicos)
  if (this.numeroBicos == 0)
  {
    this.numeroBicos = this.numeroBicosDefault;
  }

  this.referencia = JSON.stringify(this.newFormReferencia.value);
  this.referencia= this.referencia.replace('"}',"");
  this.referencia = this.referencia.replace('{"referencia":"',"");
  this.referencia= this.referencia.replace('}',"");
  this.referencia = this.referencia.replace('{"referencia":',"");
  this.referencia = Number(this.referencia);
  console.log(this.referencia);
  if (this.referencia == 0 || this.referencia == null)
  {
    this.referencia = this.referenciaDefault;
  }

  this.erroAdm = JSON.stringify(this.newFormErroAdm.value);
  this.erroAdm= this.erroAdm.replace('"}',"");
  this.erroAdm = this.erroAdm.replace('{"erroAdm":"',"");
  this.erroAdm= this.erroAdm.replace('}',"");
  this.erroAdm = this.erroAdm.replace('{"erroAdm":',"");
  this.erroAdm = Number(this.erroAdm);
  if (this.erroAdm == 0 )
  {
    this.erroAdm = this.erroAdmDefault;
  }

  let newData={
    titulo: this.titulo,
    numeroBicos: this.numeroBicos,
    referencia: this.referencia,
    erroAdm: this.erroAdm,
    unidade: this.unidade,
    coleta: this.coleta
  }
  console.log(newData);
  this.view.dismiss(newData);
  
}
  cancelNewModal(){
    
    this.view.dismiss();
  }
}
