import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIsCorrect]'
})
export class IsCorrent {

  @Input() isCorrect : Boolean = false;
  constructor(private el : ElementRef, private render : Renderer2) { }

  @HostListener('click') questionAnswer(){
    if(this.isCorrect){
      this.render.setStyle(this.el.nativeElement,'color','#23903c');
      this.render.setStyle(this.el.nativeElement,'background','#d4edda');
      this.render.setStyle(this.el.nativeElement,'font-weight','500');
      this.render.setStyle(this.el.nativeElement,'border','1px solid #23903c');
    }else{
      this.render.setStyle(this.el.nativeElement,'color','#a42834');
      this.render.setStyle(this.el.nativeElement,'background','#f8d7da');
      this.render.setStyle(this.el.nativeElement,'font-weight','500');
      this.render.setStyle(this.el.nativeElement,'border','none');
      this.render.setStyle(this.el.nativeElement,'border','1px solid #a42834');
    }
  }
}
