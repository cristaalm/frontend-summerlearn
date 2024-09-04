import { min } from 'lodash';
import { status } from './useFormStatus';
import { validate } from './useValidationFunctions';

export const validatePassword = (e) => {
  const { name, value } = e.target;
  const passwordRegex = status.value.password.Regex;

  let secureLevel = 0;
  let color = 'gray';

  if (passwordRegex.length.test(value)) {
    secureLevel = 1;
  }

  if (passwordRegex.safeLength.test(value)) {
    secureLevel = 2;
  }

  if (passwordRegex.ultraSafeLength.test(value)) {
    secureLevel = 3;
  }

  let complexity = 0;
  if (passwordRegex.uppercase.test(value)){
    complexity++;
  }
  if (passwordRegex.lowercase.test(value)) {
    complexity++;
  }
  if (passwordRegex.number.test(value)) {
    complexity++;
  }
  if (passwordRegex.special.test(value)) {
    complexity++;
  }

  if (secureLevel >= 1 && complexity >= 2 ) secureLevel = Math.max(secureLevel, 2);
  if (secureLevel >= 2 && complexity >= 3) secureLevel = Math.max(secureLevel, 3);
  if (secureLevel >= 3 && complexity === 4) secureLevel = Math.max(secureLevel, 4);

  if (!passwordRegex.secuentialNumbers.test(value)) secureLevel = 0;
  if (!passwordRegex.noRepeat.test(value)) secureLevel = 0;
  

  switch (secureLevel) {
    case 1:
      color = '[&.active]:bg-yellow-600';
      break;
    case 2:
      color = '[&.active]:bg-amber-600';
      break;
    case 3:
      color = '[&.active]:bg-green-600';
      break;
    case 4:
      color = '[&.active]:bg-blue-600';
      break;
    default:
      color = '[&.active]:bg-red-600';
  }

  status.value.password.color = color;
  status.value.password.secure = secureLevel;

  if (secureLevel > 2) {
    status.value[name].value = true;
    status.value[name].error = false;
  } else {
    status.value[name].value = false;
    status.value[name].error = true;
  }

  validate();
};
