import { FormControl } from "@angular/forms";

/** Status only accepts Active or Inactive */
export function statusValidator(control: FormControl) {
    let status = control.value;
    if(status === 'Active' || status === 'Inactive'){
        return null;
    }
    return {
        invalidStatus: {
            status: status
        }
    };
}