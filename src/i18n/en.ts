export const EN = {
  'app.title': "Alchemist's Cauldron",

  'hud.time': 'Time',
  'score.label': 'Score',

  'shelf.title': 'Ingredients',
  'chip.temperature': 'T',
  'chip.density': 'D',
  'chip.magicPower': 'MP',

  'parameter.temperature': 'Temperature',
  'parameter.density': 'Density',
  'parameter.magicPower': 'Magic Power',

  'recipe.title': 'Current Recipe',
  'recipe.counter': 'Ingredients: {added} / {max}',

  'difficulty.easy': 'Easy',
  'difficulty.medium': 'Medium',
  'difficulty.hard': 'Hard',

  'action.start': 'Start Game',
  'action.continue': 'Continue',
  'action.brew': 'Brew',
  'action.pause': 'Pause',
  'action.help': 'Help',
  'action.menu': 'Menu',

  'help.title': 'How to play',
  'rules.pick': 'Pick ingredients from the shelf to fill the cauldron.',
  'rules.values':
    'Every ingredient changes Temperature, Density and Magic Power.',
  'rules.target':
    'Move all three values into the target ranges of the current recipe.',
  'rules.brew':
    'Press Brew to check the mix. A good brew gives score and bonus time.',
  'rules.stock':
    'Each ingredient has a limited stock and a failed brew also spends it.',
  'rules.end':
    'The run ends when the time or the lives run out, or the shelf is empty.',

  'dialog.close': 'Close',

  'menu.title': 'Menu',
  'menu.language': 'Language',
  'menu.difficulty': 'Difficulty',
  'menu.difficultyFixed': 'Difficulty: {name}',
  'menu.difficultyLocked': 'It can only be changed before a run starts.',
  'menu.shelfSize': '{count} ingredients',
  'menu.cauldron': '{count} in the cauldron',
  'menu.time': '{count} s',
  'menu.tolerance': 'tolerance ±{count}',
  'menu.lives': '{count} lives',
  'menu.score': '{count} per brew',
  'menu.continue': 'Continue Game',
  'menu.newGame': 'New Game',
  'menu.leaderboard': 'Leaderboard',

  'pause.title': 'Paused',
  'pause.text': 'The run is on hold and the timer is stopped.',
  'pause.exit': 'Exit to Menu',
  'pause.resume': 'Resume',

  'leaderboard.title': 'Top 10',
  'leaderboard.empty': 'No results yet.',
  'leaderboard.name': 'Name',
  'leaderboard.score': 'Score',
  'leaderboard.date': 'Date',
  'leaderboard.clear': 'Clear Leaderboard',
  'leaderboard.clearText':
    'All saved results will be removed. This cannot be undone.',
  'leaderboard.clearConfirm': 'Yes, clear it',
  'leaderboard.cancel': 'Cancel',

  'gameOver.title': 'Game Over',
  'gameOver.reason.time': 'Time is up',
  'gameOver.reason.lives': 'No lives left',
  'gameOver.reason.ingredients': 'Out of ingredients',
  'gameOver.score': 'Final score',
  'gameOver.saved': 'Result saved to the leaderboard.',
  'gameOver.nameLabel': 'Top 10 result! Enter your name',
  'gameOver.nameError': 'Use {min}-{max} letters, digits, space, _ or -',
  'gameOver.save': 'Save Result',
  'gameOver.playAgain': 'Play Again',
  'gameOver.leaderboard': 'Leaderboard',
} as const;
