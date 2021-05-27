import { Entry } from './entry';
import { element } from 'protractor';

export class Map {
    entries: Array<Entry> = [];

    contains (key: string): boolean {
        if (this.entries.length > 0) {
            console.log('verifying key ' + key);
            let flag = false;
            this.entries.forEach(entry => {
                console.log('verifying2 key ' + (entry.key === key));
                if (entry.key === key) {
                    flag = true;
                }
            });
            return flag;
        } else {
            return false;
        }
    }

    put(key: string, value: string): void {
        console.log('key ' + key + ' ' + value);
        if (! (this.entries.length > 0) ) {
            // console.log('in if',value);
            const new_entry = new Entry();
            new_entry.key = key;
            new_entry.value = [value];
            this.entries.push(new_entry);
        } else if (this.contains(key)) {
            // console.log('in else ', value);
            this.entries.forEach(entry => {
                if (entry.key === key) {
                    entry.value.push(value);
                }
            });
        } else {
            //  console.log('in else', value);
            const new_entry = new Entry();
            new_entry.key = key;
            new_entry.value = [value];
            this.entries.push(new_entry);
        }
    }
}

