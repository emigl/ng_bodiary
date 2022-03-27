import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";

export class MyErrorStateMatcher implements MyErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidParent = !!(
      control
      && control.parent
      && control.parent.invalid
      && control.parent.dirty
      && control.parent.touched
      && control.parent.hasError('notSame'));
    return (invalidParent);
  }
}
    
  