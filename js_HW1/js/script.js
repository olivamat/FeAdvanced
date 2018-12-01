/* 
  ишите скрипт имитирующий авторизацию администратора в панели управления.

При загрузке страницы у посетителя запрашивается логин через prompt:

Если посетитель нажал Cancel — показывать alert с текстом Отменено пользователем!
Если было введено что либо другое, что не совпадает со значением константы adminLogin, показывать alert с текстом Доступ запрещен, неверный логин!
Если был введен логин совпадающий со значением константы adminLogin, спрашивать пароль через prompt.
При вводе пароля:

Если нажали Cancel, показывать alert с текстом Отменено пользователем!
Если введен пароль который не совпадает со значением константы adminPassword, показывать alert с текстом Доступ запрещен, неверный пароль!
Если введён пароль который совпадает со значением константы adminPassword, показывать alert с текстом Добро пожаловать!
🔔 Для удобства и чистоты кода сохраните в переменные сообщения отображаемые в alert
*/
const login = "adminLogin";
const pasword = "adminPassword";
const canselUser = "Отменено пользователем!";
const enterLogin = "Введите логин";
const enterPassword = "Введите пароль";
const isForbiddenBadPassword = "Доступ запрещен, неверный пароль!";
const isForbiddenBadLogin = "Доступ запрещен, неверный логин!";
const welcome = "Добро пожаловать!";

const loginUser = prompt(enterLogin);
if (loginUser === null) {
  alert(canselUser);
} else if (loginUser != login) {
  alert(isForbiddenBadLogin);
} else {
  const paswordUser = prompt(enterPassword);
  if (paswordUser === null) {
    alert(canselUser);
  } else if (paswordUser !== pasword) {
    alert(isForbiddenBadPassword);
  } else if (paswordUser === pasword) {
    alert(welcome);
  }
}
