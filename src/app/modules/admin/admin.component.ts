import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../share/services/auth.service';
import { AdminService } from '../../share/services/admin.service';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    standalone: false,
    encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit{
  isShowMenuSidebar:boolean = false;
  userEmail:string;
  constructor(library: FaIconLibrary,
    private authService: AuthService,
    private _adSer:AdminService
  ) {
    library.addIconPacks(fas, far);
  }

  ngOnInit(): void {
    this.userEmail = this.authService.userEmail;
  }

  logout(){
    this.authService.redirectLogin();
  }

}
