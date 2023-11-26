import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytes',
  standalone: true
})
export class BytesPipe implements PipeTransform {

    public readonly units = [ 'b', 'kB', 'MB', 'GB', 'TB' ];

    private next(bytes: number, unit: this['units'][number], objetive?: this['units'][number]) {
        const next = {
            bytes: bytes / 1024,
            unit: this.units[this.units.findIndex((element) => element === unit) + 1] || this.units[4]
        };

        let result = '';

        if ((bytes < 1000 && !objetive) || unit === this.units[4]) {
            const toNext = bytes > 1000;
            result = `${ (toNext ? next.bytes : bytes).toFixed(2) }${ toNext ? next.unit : unit }`;
        } else {
            result = this.next(next.bytes, next.unit, objetive);
        }

        return result;
    }

    transform(bytes: number, ...args: [this['units'][number], this['units'][number]?]): string {
        return this.next(bytes, args[0], args[1]);
    }

}
