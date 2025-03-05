import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { docManagementRoutes } from './doc-management.route';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MyDocComponent } from './my-doc/my-doc.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer'
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AllDocsComponent } from './all-docs/all-docs.component';


@NgModule({
  declarations: [MyDocComponent, AllDocsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(docManagementRoutes),
    FormsModule,
    NgxDocViewerModule,
    PdfViewerModule,
  ]
})
export class DocManagementModule { }
