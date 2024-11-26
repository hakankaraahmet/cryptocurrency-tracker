import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Angular Material
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class ComponentsModule {}
