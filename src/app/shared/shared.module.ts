import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Material
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [],
})
export class SharedModule {}
