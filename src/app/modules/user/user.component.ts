import { Component, ViewEncapsulation } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { BrowserScreenService } from '../../../core/services/browser-screen.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    standalone: false
})
export class UserComponent {
  isShowMenuSidebar:boolean = false;

  constructor(library: FaIconLibrary
  ) {
    library.addIconPacks(fas, far);
  }

}
