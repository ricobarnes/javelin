import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MaterialModule, ColorPickerModule],
  exports: [HeaderComponent, MaterialModule, ColorPickerModule],
})
export class SharedModule {}
