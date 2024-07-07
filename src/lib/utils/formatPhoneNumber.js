
export function formatPhoneNumber(number, backend=false) {
  // Видаляємо будь-які нецифрові символи з номеру телефону
  const phoneNumber = number.replace(/\D/g, '');
  // Перевіряємо, чи довжина номеру телефону дорівнює 12 (припускаємо, що вхідний формат правильний)
  if (phoneNumber.length === 12) {
    if(backend){
      // Форматуємо номер у вигляді 380671112233
      return phoneNumber
    }
    else{
    // Форматуємо номер у вигляді +380 67 111 22 33
    return `+${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(5, 8)} ${phoneNumber.slice(8, 10)} ${phoneNumber.slice(10, 12)}`;}
  } else {
    // Якщо номер не відповідає очікуваній довжині, повертаємо не змінений рядок або можемо повернути помилку
    return number;
  }
}