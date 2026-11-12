import type { Translation } from './types';

export const RU: Translation = {
  'app.title': 'Котёл алхимика',

  'hud.time': 'Время',
  'score.label': 'Очки',

  'shelf.title': 'Ингредиенты',
  'chip.temperature': 'Т',
  'chip.density': 'П',
  'chip.magicPower': 'МС',

  'parameter.temperature': 'Температура',
  'parameter.density': 'Плотность',
  'parameter.magicPower': 'Магическая сила',

  'recipe.title': 'Текущий рецепт',
  'recipe.counter': 'Ингредиенты: {added} / {max}',

  'difficulty.easy': 'Лёгкая',
  'difficulty.medium': 'Средняя',
  'difficulty.hard': 'Сложная',

  'action.start': 'Начать игру',
  'action.continue': 'Продолжить',
  'action.brew': 'Сварить',
  'action.pause': 'Пауза',
  'action.help': 'Помощь',
  'action.menu': 'Меню',

  'help.title': 'Как играть',
  'rules.pick': 'Выбирайте ингредиенты с полки, чтобы наполнить котёл.',
  'rules.values':
    'Каждый ингредиент меняет температуру, плотность и магическую силу.',
  'rules.target':
    'Приведите все три значения в целевые диапазоны текущего рецепта.',
  'rules.brew':
    'Нажмите «Сварить», чтобы проверить смесь. Удачная варка даёт очки и бонусное время.',
  'rules.stock':
    'Запас каждого ингредиента ограничен, неудачная варка тоже его расходует.',
  'rules.end':
    'Игра заканчивается, когда истекает время, кончаются жизни или пустеет полка.',

  'dialog.close': 'Закрыть',
  'common.cancel': 'Отмена',
  'common.loading': 'Загрузка...',
  'common.date': 'Дата',
  'common.difficulty': 'Сложность',
  'common.score': 'Очки',
  'common.reason': 'Причина',

  'menu.title': 'Меню',
  'menu.language': 'Язык',
  'menu.difficultyFixed': 'Сложность: {name}',
  'menu.difficultyLocked': 'Её можно изменить только до начала игры.',
  'menu.shelfSize': 'ингредиентов: {count}',
  'menu.cauldron': 'в котле: {count}',
  'menu.time': '{count} с',
  'menu.tolerance': 'допуск ±{count}',
  'menu.lives': 'жизней: {count}',
  'menu.score': '{count} за варку',
  'menu.continue': 'Продолжить игру',
  'menu.newGame': 'Новая игра',
  'menu.leaderboard': 'Таблица лидеров',

  'pause.title': 'Пауза',
  'pause.text': 'Игра приостановлена, таймер остановлен.',
  'pause.exit': 'Выйти в меню',
  'pause.resume': 'Продолжить',

  'leaderboard.title': 'Топ-10',
  'leaderboard.empty': 'Пока нет результатов.',
  'leaderboard.name': 'Имя',
  'leaderboard.clear': 'Очистить таблицу',
  'leaderboard.clearText':
    'Все сохранённые результаты будут удалены. Это нельзя отменить.',
  'leaderboard.clearConfirm': 'Да, очистить',

  'gameOver.title': 'Игра окончена',
  'gameOver.reason.time': 'Время вышло',
  'gameOver.reason.lives': 'Жизни закончились',
  'gameOver.reason.ingredients': 'Ингредиенты закончились',
  'gameOver.score': 'Итоговый счёт',
  'gameOver.saved': 'Результат сохранён в таблице лидеров.',
  'gameOver.nameLabel': 'Результат в топ-10! Введите имя',
  'gameOver.nameError': 'Используйте {min}-{max} букв, цифр, пробел, _ или -',
  'gameOver.save': 'Сохранить результат',
  'gameOver.playAgain': 'Играть снова',
  'gameOver.leaderboard': 'Таблица лидеров',

  'menu.signIn': 'Войти',

  'profile.title': 'Профиль',
  'profile.signOut': 'Выйти',
  'profile.signOutText':
    'Чтобы снова открыть профиль, нужно будет войти заново.',
  'profile.signOutConfirm': 'Да, выйти',
  'profile.history': 'Последние игры',
  'profile.empty': 'Пока нет сыгранных игр.',
  'profile.loadError': 'Не удалось загрузить историю.',
  'profile.back': 'Вернуться к игре',

  'auth.title': 'Аккаунт',
  'auth.google': 'Продолжить с Google',
  'auth.or': 'или',
  'auth.name': 'Имя',
  'auth.email': 'Почта',
  'auth.password': 'Пароль',
  'auth.confirm': 'Повторите пароль',
  'auth.showPassword': 'Показать пароль',
  'auth.hidePassword': 'Скрыть пароль',
  'auth.submitSignIn': 'Войти',
  'auth.submitRegister': 'Создать аккаунт',
  'auth.noAccount': 'Нет аккаунта? Зарегистрируйтесь',
  'auth.haveAccount': 'Уже есть аккаунт? Войдите',
  'auth.error.emailFormat': 'Введите корректный адрес почты.',
  'auth.error.passwordLength': 'Пароль должен быть не короче 6 символов.',
  'auth.error.confirmMismatch': 'Пароли не совпадают.',
  'auth.error.nameInvalid': 'Используйте 2-15 букв, цифр, пробел, _ или -',
  'auth.error.emailInUse': 'Эта почта уже зарегистрирована.',
  'auth.error.invalidEmail': 'Этот адрес почты некорректен.',
  'auth.error.invalidCredential': 'Неверная почта или пароль.',
  'auth.error.weakPassword': 'Пароль слишком простой.',
  'auth.error.tooManyRequests': 'Слишком много попыток. Повторите позже.',
  'auth.error.network': 'Нет соединения. Проверьте сеть.',
  'auth.error.popupClosed': 'Окно входа было закрыто.',
  'auth.error.popupBlocked': 'Браузер заблокировал окно входа.',
  'auth.error.unknown': 'Что-то пошло не так. Попробуйте снова.',
};
