import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter',
    pure: false
})
export class SearchFilterPipe implements PipeTransform {
    transform(entries: any[], filter: string): any {
        return entries.filter(entry => entry.key.indexOf(filter) !== -1);
    }
}
