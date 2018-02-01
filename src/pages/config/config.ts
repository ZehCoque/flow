import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


//Validators
import { NumeroBicosValidator } from  '../../validators/numeroBicos';
import { ErroAdmValidator } from  '../../validators/erroAdm';
import { ReferenciaValidator } from  '../../validators/referencia';
import { ArquivoValidator} from  '../../validators/arquivo';


@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  configForm: FormGroup;
  constructor(
    private navParams: NavParams,
    private view: ViewController,
    private formBuilder: FormBuilder
  ) {

    this.configForm = formBuilder.group({
      titulo: ['', Validators.compose([Validators.required,Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9´]*')]), ArquivoValidator.checkFilename],
      numeroBicos: ['', NumeroBicosValidator.isValid],
      referencia: ['', ReferenciaValidator.isValid],
      erroAdm: ['', ErroAdmValidator.isValid],
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
    
  }

  cancelConfigModal(){
    this.view.dismiss();
  }
}
