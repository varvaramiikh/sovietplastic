/* Сгенерировано из original-export/project/Main.dc.html (spItems, запасные демонстрационные карточки) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
/** Демонстрационные карточки, которые страница показывает, пока в localStorage нет базы "sp-db". */
export function demoMainFigures() {
  var TAGS = [
    'Фигурное катание',
    'Спорт',
    'Балет',
    'Детство',
    'Животные',
    'Цирк',
    'Танец',
    'Музыка',
    'Женский образ',
    'Пионеры',
  ];
  var titles = [
    'Название статуэтки',
    'Название статуэтки средней длины',
    'Длинное название статуэтки, которое переносится на несколько строк без многоточия',
  ];
  var out = [];
  for (var i = 0; i < 24; i++) {
    var idx = [
      i % 10,
      (i * 3 + 1) % 10,
      (i * 7 + 4) % 10,
      (i * 9 + 2) % 10,
      (i + 5) % 10,
      (i * 3 + 6) % 10,
      (i + 3) % 10,
      (i * 7 + 8) % 10,
      (i + 1) % 10,
      (i + 7) % 10,
    ];
    var want = (i % 5) + 4;
    var seen = {};
    var tags = [];
    for (var k = 0; k < idx.length && tags.length < want; k++) {
      var t = idx[k];
      if (seen[t]) continue;
      seen[t] = 1;
      tags.push({ label: TAGS[t], weight: ((i * 37 + k * 53 + t * 11) % 85) + 15 });
    }
    tags.sort(function (a, b) {
      return b.weight - a.weight;
    });
    out.push({
      id: i + 1,
      title: titles[i % 3],
      mainTag: tags[0].label,
      category: ['Статуэтка', 'Шкатулка', 'Животные', 'Бюст', 'Пепельница', 'Чернильный прибор'][
        [0, 0, 1, 2, 0, 3, 0, 4, 2, 0, 5, 1][i % 12]
      ],
      scale: [80, 70, 76, 66][i % 4],
      img: ['/images/placeholder-ballerina.svg', '/images/placeholder-boxer.svg', '/images/placeholder-skater.svg'][
        i % 3
      ],
    });
  }
  return out;
}
