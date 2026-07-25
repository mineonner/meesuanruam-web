import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrl: './menu-sidebar.component.scss',
    standalone: false
})
export class MenuSidebarComponent {
  @Input() isShowMenuSidebar: boolean
  @Output() isShowMenuSidebarChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleMenuSidebar(){
    this.isShowMenuSidebar = !this.isShowMenuSidebar;
    this.isShowMenuSidebarChange.emit(this.isShowMenuSidebar);
  }
}
