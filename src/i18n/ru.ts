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

  'menu.title': 'Меню',
  'menu.language': 'Язык',
  'menu.difficulty': 'Сложность',
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
  'leaderboard.score': 'Очки',
  'leaderboard.date': 'Дата',
  'leaderboard.clear': 'Очистить таблицу',
  'leaderboard.clearText':
    'Все сохранённые результаты будут удалены. Это нельзя отменить.',
  'leaderboard.clearConfirm': 'Да, очистить',
  'leaderboard.cancel': 'Отмена',

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
};
