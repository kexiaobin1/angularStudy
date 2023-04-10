import {AbstractControl, ValidationErrors} from '@angular/forms';

export class YzValidators {
  /**
   * 验证手机号
   */
  static phone(control: AbstractControl): ValidationErrors | null {
    const phone = control.value as string;
    if (phone.length === 11 && phone.startsWith('1')) {
      return null;
    }
    return {phone: '手机号格式错误'};
  }
}
