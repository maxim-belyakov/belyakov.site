// Content and options for the private invitation at /i/<slug>. Everything the
// page says lives here so the copy can be edited without touching the flow.

export type FoodOption = {
  id: string
  emoji: string
  label: string
}

export const INVITE_COPY = {
  askTitle: 'Пойдёшь со мной на свидание вечером в кафешкову?',
  askSubtitle: '(Мне ок, если устанешь и захочешь дома повалюниться)',
  yesLabel: 'Да',
  // One gentle re-ask, and that is the whole game. A second "no" is taken as
  // the answer: the button never begs, shrinks away or gets disabled.
  noLabels: ['Нет', 'Точно нет?'],
  confirmTitle: 'Подожди, ты действительно сказала да?',
  confirmSubtitle: 'Я был готов что скажешь "нет" ахах',
  confirmButton: 'Да Да дА',
  whatTitle: 'Что ты хочешь?',
  whatSubtitle: 'Выбери что тебе в кайф',
  whatButton: 'Готово',
  declinedTitle: 'Понял. Не сегодня',
  declinedSubtitle: 'Всё в порядке, честно. Никуда не идём - валяемся дома',
  finalTitle: 'Рад то что не отказалась.',
  finalSubtitle: 'Значит сегодня вечером. Собираемся и идём',
  sendingNote: 'Отправляю Максу...',
  sentNote: 'Макс уже знает',
  failedNote: 'Не смог отправить Максу. Скинь ему скриншот, он разберётся.',
} as const

export const FOOD_OPTIONS: FoodOption[] = [
  { id: 'sushi', emoji: '🍣', label: 'Суши' },
  { id: 'ramen', emoji: '🍜', label: 'Рамен' },
  { id: 'burger', emoji: '🍔', label: 'Бургер' },
  { id: 'pasta', emoji: '🍝', label: 'Паста' },
  { id: 'onigiri', emoji: '🍙', label: 'Онигири!!!!' },
  { id: 'surprise', emoji: '✨', label: 'Удиви меня' },
]

export const INVITE_IMAGES = {
  ask: '/invite/cats-rose.webp',
  confirm: '/invite/cats-hug.webp',
  declined: '/invite/cats-hug.webp',
  done: '/invite/bunny-heart.webp',
} as const

export function foodById(id: string): FoodOption | undefined {
  return FOOD_OPTIONS.find((option) => option.id === id)
}
