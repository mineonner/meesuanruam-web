import { Component, ContentChild, Input, SimpleChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'mee-view',
  templateUrl: './mee-view.component.html',
  styleUrl: './mee-view.component.scss',
  standalone: false
})
export class MeeViewComponent {
  @ContentChild('addValue', { read: TemplateRef }) mAddValue: TemplateRef<any>;

  @Input() title: string = '';
  @Input() value: string = '';

  textValue: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.textValue = !!this.value ? this.value : '-';
    }
  }
}
