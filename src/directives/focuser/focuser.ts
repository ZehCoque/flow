import {Directive, Renderer, ElementRef, OnInit, AfterViewInit, Input} from '@angular/core';

@Directive({
  selector: '[focusOnInit]'
})
export class FocusDirective implements OnInit, AfterViewInit {
  @Input('focusOnInit') priority: number = 0;

  static instances: FocusDirective[] = [];

  constructor(public renderer: Renderer, public elementRef: ElementRef) {
  }

  ngOnInit(): void {
    FocusDirective.instances.push(this)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      FocusDirective.instances.splice(FocusDirective.instances.indexOf(this), 1);
    });

    if (FocusDirective.instances.every((i) => this.priority >= i.priority)) {
      this.renderer.invokeElementMethod(
        this.elementRef.nativeElement, 'focus', []);
    }
  }
}

