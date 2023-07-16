avatar = {
    image: 'ссылка на изображение',
    size: 100, // ?? размер изображения ??
    position: { x: 0, y: 0 } // ?? позиция изображения ??
} // Аватар
// {
//     image: 'ссылка на изображение',
//     size: 100,
//     position: { x: 0, y: 0 }
// }

account = {
    username: 'ник аккаунта',
    id: 1, // id аккаунта
    link: 'ссылка на аккаунт',
    isVerified: false, // Верифицированный ли аккаунт
    isBot: false, // Является ли аккаунт ботом
    avatar: {}, // Аватар аккаунта, avatar
    background: {}, // Фон аккаунта, avatar
    status: { // ?? статус аккаунта: afk, playmatch, watchmatch ??
        type: 'afk', // тип статуса
        matchid: 1, // ?? ид матча ??
        gameName: 'CS:GO', // ?? имя игры ??
    },
    isInTeam: { // ?? состоит ли в тиме ??
        teamid: 295, // ид тимы
        team: {} // данные о тиме, team
    }
} // Любая информация об любом аккаунте
// {
//     username: 'ник аккаунта',
//     id: 1,
//     link: 'ссылка на аккаунт',
//     isVerified: false,
//     isBot: false,
//     avatar: {},
//     background: {},
//     status: {
//         type: 'afk',
//         matchid: 1,
//         gameName: 'CS:GO',
//     },
//     isInTeam: {
//         teamid: 295,
//         team: {}
//     }
// }

team = {
    name: 'название тимы',

    id: 1, // ид тимы
    host: {}, // данные о хосте, account

    accounts: [] // все аккаунты в тиме, account
} // Информация о тиме
// {
//     name: 'название тимы',

//     id: 1,
//     host: {},

//     accounts: []
// }

notify = {
    title: 'Название уведомления',
    text: 'Описание уведомления',
    date: new Date(), // время уведомления
    attached: { // ?? прикрепленное к уведомлению ??
        photo: 'ссылка на фото', // ?? одно фото ??,
        photos: [], // ?? несколько фото ??,
        avatar: {} // Аватар, avatar
    }
} // Информация об уведомлении
// {
//     title: 'Название уведомления',
//     text: 'Описание уведомления',
//     date: new Date(),
//     attached: {
//         photo: 'ссылка на фото',
//         photos: [],
//         avatar: {}
//     }
// }

news = {
    author: {}, // автор новости, account
    date: new Date(), // время новости
    body: {
        text: 'text', // текст новости
        attached: { // прикрепленное
            images: [ 'https://i.pinimg.com/736x/5a/c0/76/5ac07656d8527a0a2fb2379081cea082.jpg' ] // ?? изображения ??
        }
    },
    feedback: [ 128, 3, 0, 252 ], // количество: лайков, дизлайков, репостов, просмотров
    userInfo: { // Данные о взаимодействии аккаунта с новостью
        like: true, // поставил ли лайк
        dislike: false, // поставил ли дизлайк
        view: false, // просмотрел ли новость
        subscribed: false // подписан ли на автора
    },
    hided: false, // скрыл ли новость
    blocked: false, // заблокировал ли автора
    ageLimit: false, // есть ли ограничения по возрасту
    comments: [] // комментарии, comment
} // Информация о новости
// {
//     author: {},
//     date: new Date(),
//     body: {
//         text: 'Привет, это первая новость здесь. Поставь лайк :)',
//         images: [ 'https://i.pinimg.com/736x/5a/c0/76/5ac07656d8527a0a2fb2379081cea082.jpg' ]
//     },
//     feedback: [ 20, 128, 3, 0, 252 ],
//     userInfo: {
//         like: true,
//         dislike: false,
//         view: false,
//         subscribed: false
//     },
//     hided: false,
//     blocked: false,
//     ageLimit: false,
//     comments: []
// }
comment = { // комментарий
    author: {}, // автор, account
    body: {
        text: 'text',
        attached: {
            images: [], // ??
        }
    },
    date: new Date(),
    feedback: [1, 2], // like, dislike
    answers: [] // ответы, comment
}
// {
//     author: {},
//     body: {
//         text: 'text',
//         attached: {
//             images: [],
//         }
//     },
//     date: new Date(),
//     feedback: [1, 2],
//     answers: []
// }

video = {
    platform: "Платформа видео: youtube, twitch",
    background: "ссылка на превью видео",
    views: 1, // количество просмотров
    author: {}, // автор видео, account
    title: "название видео",
    link: "ссылка на видео"
} // Информация о видео
// {
//     platform: "Платформа видео: youtube, twitch",
//     background: "ссылка на превью видео",
//     views: 1,
//     author: {},
//     title: "название видео",
//     link: "ссылка на видео"
// }

match = {
    id: 1, // ид матча
    map: 'название карты матча',
    teams: [ // команды матча
        {
            name: 'Название команды',
            avatar: {}, // аватар команды, avatar
            accounts: [], // игроки команды, account
            score: 13, // счет команды,
            captain: {} // капитан, account
        },
        {
            name: 'Название команды',
            avatar: {}, // аватар команды, avatar
            accounts: [], // игроки команды, account
            score: 16, // счет команды,
            captain: {} // капитан, account
        }
    ],
    date: new Date(), // Время начала матча
    time: '15:23', // Длина матча
    type: '1 vs 1', // тип матча
    game: 'CS:GO' // игра
}
// {
//     id: 1,
//     map: 'название карты матча',
//     teams: [
//         {
//             name: 'Название команды',
//             avatar: {},
//             accounts: [],
//             score: 13,
//             captain: {}
//         },
//         {
//             name: 'Название команды',
//             avatar: {},
//             accounts: [],
//             score: 16,
//             captain: {}
//         }
//     ],
//     date: new Date(),
//     time: '15:23',
//     type: '1 vs 1',
//     game: 'CS:GO'
// }

dialog = {
    id: 1, // id
    name: 'Название диалога', // ??
    avatar: {}, // ?? Аватарка диалога, avatar ??
    type: 'personal', // тип (personal, team, group)
    accounts: [], // участники, account
    lastMessage: { // последнее сообщение
        date: new Date(),
        text: 'text',
        type: 'message', // тип сообщения (message, photo, video)
        owner: {} // Кто отправил сообщение
    },
    isTyping: {}, // если печатают, account
    unread: 1, // количество непрочитанных сообщений
    messages: [], // сообщения, message
    noAnswer: '' // ?? запрещено отвечать, (banned, nofriend, youbaned) ??
} // Информация о диалоге
// {
//     id: 1,
//     name: 'Название диалога',
//     avatar: {},
//     type: 'personal',
//     accounts: [],
//     lastMessage: {
//         date: new Date(),
//         text: 'text',
//         type: 'message',
//         owner: {}
//     },
//     isTyping: {},
//     unread: 1,
//     messages: []
// }

message = {
    id: 1,
    owner: {}, // отправитель, account
    date: new Date(),
    readers: [], // кто прочитал сообщение
    text: ''
}
// { id: 1, owner: {}, date: new Date(), readers: [], text: '' }