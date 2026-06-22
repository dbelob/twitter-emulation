import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink]
})
export class NotFoundComponent {
}
