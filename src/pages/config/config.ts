import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
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
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  titulo: string;
  numeroBicosDefault: number = 102;
  numeroBicos: any;
  referenciaDefault: number = 400;
  referencia: any;
  erroAdmDefault: number = 10;
  erroAdm: any;
  unidade: string = "mm";
  coleta: string = "bt";
  configData: DataList;
  configFormTitulo: FormGroup;
  configFormNumeroBicos: FormGroup;
  configFormReferencia: FormGroup;
  configFormErroAdm: FormGroup;

  constructor(
    private view: ViewController,
    private formBuilder: FormBuilder,
    public storage: Storage,
    public file: File,
    public userData: UserDataProvider
  ) {

    this.configFormTitulo = this.formBuilder.group({
      titulo: [this.titulo, Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(20), 
        Validators.pattern('[a-zA-Z0-9éãáÁÉçÇÍíóÓúÚ]*')]), ArquivoValidator.checkFilenameAvailable]
  });

    this.configFormNumeroBicos = this.formBuilder.group({
  numeroBicos: [this.numeroBicos, NumeroBicosValidator.isValid]
    });

    this.configFormReferencia = this.formBuilder.group({
      referencia: [this.referencia, ReferenciaValidator.isValid]
      });

      this.configFormErroAdm = this.formBuilder.group({
      erroAdm: [this.erroAdm, ErroAdmValidator.isValid]
      });

      this.userData.getData().then((value) => {
        this.configData = value;
        if (this.configData != null)
        {
        this.titulo = this.configData.titulo;
        this.numeroBicos = this.configData.numeroBicos;
        this.referencia = this.configData.referencia;
        this.erroAdm = this.configData.erroAdm;
        this.unidade = this.configData.unidade;
        this.coleta = this.configData.coleta;
        }

      });
      
  }

  onChangeUnidade(SelectedValue){ 
    this.unidade = SelectedValue;
   }

   onChangeColeta(SelectedValue){ 
    this.coleta = SelectedValue;
   }

saveConfigModal()
{
  this.titulo = JSON.stringify(this.configFormTitulo.value);
  this.titulo = this.titulo.substring(11);
  this.titulo = this.titulo.replace('"}',"");

  this.numeroBicos = JSON.stringify(this.configFormNumeroBicos.value);
  this.numeroBicos = this.numeroBicos.replace('"}',"");
  this.numeroBicos = this.numeroBicos.replace('{"numeroBicos":"',"");
  this.numeroBicos = this.numeroBicos.replace('}',"");
  this.numeroBicos = this.numeroBicos.replace('{"numeroBicos":',"");
  this.numeroBicos = Number(this.numeroBicos)
  if (this.numeroBicos == 0)
  {
    this.numeroBicos = this.numeroBicosDefault;
  }

  this.referencia = JSON.stringify(this.configFormReferencia.value);
  this.referencia= this.referencia.replace('"}',"");
  this.referencia = this.referencia.replace('{"referencia":"',"");
  this.referencia= this.referencia.replace('}',"");
  this.referencia = this.referencia.replace('{"referencia":',"");
  this.referencia = Number(this.referencia);
  if (this.referencia == 0)
  {
    this.referencia = this.referenciaDefault;
  }

  this.erroAdm = JSON.stringify(this.configFormErroAdm.value);
  this.erroAdm= this.erroAdm.replace('"}',"");
  this.erroAdm = this.erroAdm.replace('{"erroAdm":"',"");
  this.erroAdm= this.erroAdm.replace('}',"");
  this.erroAdm = this.erroAdm.replace('{"erroAdm":',"");
  this.erroAdm = Number(this.erroAdm);
  if (this.erroAdm == 0)
  {
    this.erroAdm = this.erroAdmDefault;
  }


  let configData={
    titulo: this.titulo,
    numeroBicos: this.numeroBicos,
    referencia: this.referencia,
    erroAdm: this.erroAdm,
    unidade: this.unidade,
    coleta: this.coleta
  }
  // console.log(this.configData)
  this.view.dismiss(configData);
  
}
  cancelConfigModal(){
    
    this.view.dismiss(this.configData);
  }
}

