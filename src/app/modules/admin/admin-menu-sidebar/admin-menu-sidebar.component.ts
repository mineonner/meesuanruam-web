import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'admin-menu-sidebar',
    templateUrl: './admin-menu-sidebar.component.html',
    styleUrl: './admin-menu-sidebar.component.scss',
    standalone: false
})
export class AdminMenuSidebarComponent {
  @Input() isShowMenuSidebar: boolean
  @Output() isShowMenuSidebarChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleMenuSidebar(){
    this.isShowMenuSidebar = !this.isShowMenuSidebar;
    this.isShowMenuSidebarChange.emit(this.isShowMenuSidebar);
  }
}
