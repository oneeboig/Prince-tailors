import { FormGroup } from "@angular/forms";

export function Match(password:string ,cpassword:string){
    return(formGroup:FormGroup)=>{
        const passwordControl = formGroup.controls[password];
        const confirmpasswordControl = formGroup.controls[cpassword];
        if(confirmpasswordControl.errors && !confirmpasswordControl.errors['Match']){
            return;
        }
        if(passwordControl.value !== confirmpasswordControl.value){
            confirmpasswordControl.setErrors({Match:true})
        }else{
            confirmpasswordControl.setErrors(null)
        }
    }
}