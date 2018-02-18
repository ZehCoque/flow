import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'bico',
    templateUrl: 'input.component.html',
})
export class InputComponent {
    @Input('group')
    public inputForm: FormGroup;
}