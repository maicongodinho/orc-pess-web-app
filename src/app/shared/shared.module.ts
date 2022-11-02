import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  ComboBoxModule,
  DatePickerModule,
  GridModule,
  IconModule,
  InputModule,
  LinkModule,
  ModalModule,
  NotificationModule,
  NumberModule,
  SkeletonModule,
  TableModule,
  ThemeModule,
  UIShellModule,
} from 'carbon-components-angular';
import { PageComponent } from './components/page/page.component';
import { FormButtonsComponent } from './components/form-buttons/form-buttons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from '@carbon/charts-angular';

@NgModule({
  declarations: [PageComponent, PageComponent, FormButtonsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // Carbon
    UIShellModule,
    ThemeModule,
    GridModule,
    ButtonModule,
    InputModule,
    NotificationModule,
    TableModule,
    SkeletonModule,
    DatePickerModule,
    NumberModule,
    ModalModule,
    LinkModule,
    ComboBoxModule,
    IconModule,
    // Carbon Charts
    ChartsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // Carbon
    UIShellModule,
    ThemeModule,
    GridModule,
    ButtonModule,
    InputModule,
    NotificationModule,
    TableModule,
    SkeletonModule,
    DatePickerModule,
    NumberModule,
    ModalModule,
    LinkModule,
    ComboBoxModule,
    IconModule,
    // Carbon Charts
    ChartsModule,
    // Components
    PageComponent,
    FormButtonsComponent,
  ],
})
export class SharedModule {}
