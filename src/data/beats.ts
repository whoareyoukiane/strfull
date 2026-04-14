import { Beat } from '../types';

export const beats: Beat[] = [
  {
    id: 1,
    title: 'BOOM BAP x IVYCRAFT x ТЁМНЫЙ ПРИНЦ x SILVER GLORIA x SOUNDCLOUD x MADK1D type beat - CRAFT',
    artist: 'kvazar',
    price: 111,
    oldPrice: 1111,
    image: '/images/beat1.jpg',
    featured: true,
    subscribe: "210"
  },
  {
    id: 2,
    title: 'холодная отрава',
    artist: 'resstoxim',
    price: 149,
    oldPrice: 1499,
    image: '/images/beat2.jpg',
    featured: true,
    subscribe: "4393"
  },
  {
    id: 3,
    title: 'ALT ROCK x GRUNGE x PUNK ROCK x MADK1D x CUPSIZE x РЭЙЧИ TYPE BEAT - ЖАЖДА',
    artist: 'kvazar',
    price: 111,
    image: '/images/beat3.jpg',
    subscribe: "210"
  },
  {
    id: 4,
    title: '""8mm" villain + madk1d + тёмный принц + metalcore tyoe beat',
    artist: 'RAMPIRA',
    price: 349,
    image: '/images/beat4.jpg',
    subscribe: "24"
  },
  {
    id: 5,
    title: 'фосфор',
    artist: 'resstoxim',
    price: 1459,
    image: '/images/beat5.jpg',
    subscribe: "4393"
  },
  {
    id: 6,
    title: 'angel | steve lacy x sombr',
    artist: 'MollyRock',
    price: 799,
    image: '/images/beat6.jpg',
    subscribe: "747"
  },
  {
    id: 7,
    title: 'Жесткий KEN CARSON x OSAMASON x PLAYBOI CARTI type beat tag',
    artist: 'НеонБитс',
    price: 500,
    image: '/images/beat7.jpg',
    subscribe: "666"
  },
  {
    id: 8,
    title: 'ken carson type beat-"lrd"',
    artist: 'LovelyLonely',
    price: 990,
    image: '/images/beat8.jpg',
    subscribe: "113"
  },
  {
    id: 9,
    title: 'resonator',
    artist: 'resstoxim',
    price: 1449,
    image: '/images/beat9.jpg',
    subscribe: "4393"
  },
  {
    id: 10,
    title: 'AHAHAHA - MADK1D X BOOMBAP X ARHIVECORE TYPE BEAT',
    artist: 'R0UZZ',
    price: 179,
    image: '/images/beat10.jpg',
    subscribe: "689"
  },
  {
    id: 11,
    title: 'восприятие',
    artist: 'resstoxim',
    price: 1499,
    image: '/images/beat11.jpg',
    subscribe: "4393"
  },
  {
    id: 12,
    title: '"RAW" Ken Carson x 9mice x Kai Angel Type Beat',
    artist: 'RAMPIRA',
    price: 349,
    image: '/images/beat12.jpg',
    subscribe: "24"
  },
];

export const licenses = [
  {
    name: 'Standart MP3',
    price: 111,
    type: 'Лизинг',
    term: '100 лет',
    files: 'MP3',
    copies: 'до 100 000',
    streams: 'до 100 000',
  },
  {
    name: 'Premium WAV',
    price: 333,
    type: 'Лизинг',
    term: '100 лет',
    files: 'MP3, WAV',
    copies: 'до 100 000',
    streams: 'до 100 000',
  },
  {
    name: 'Trackout',
    price: 555,
    type: 'Лизинг',
    term: '100 лет',
    files: 'MP3, WAV, TRACKOUT',
    copies: 'до 100 000',
    streams: 'до 100 000',
  },
  {
    name: 'Exclusive Rights',
    price: 2222,
    type: 'Эксклюзив',
    term: '3 года',
    files: 'MP3, WAV, TRACKOUT',
    copies: 'Неограничено',
    streams: 'Неограничено',
  },
];
