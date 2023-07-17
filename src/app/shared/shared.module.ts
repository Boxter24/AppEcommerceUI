import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*================================ Icons ================================= */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
    exports: [
        CommonModule,
        FontAwesomeModule,
    ],
    declarations: [
    ],
})
export class SharedModule {
}
