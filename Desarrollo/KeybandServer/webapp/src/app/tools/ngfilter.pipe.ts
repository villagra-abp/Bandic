import {PipeTransform, Pipe} from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'AgePipe'
})
export class mypipe3 implements PipeTransform{

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value, args?) {
    // ES6 array destructuring
    let [minAge] = args;
    return value.filter(person => {
      return person.age >= +minAge;
    });
  }

}