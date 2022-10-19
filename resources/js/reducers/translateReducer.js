import {SET_LANG} from "../utils/reducerConsts";

const defaultState = {
    lang: 'en',
    modalIsLogged: {
        please: {en: 'Please, ', ru: 'Пожалуйста, '},
        auth: {en: ' Login ', ru: ' авторизуйтесь '},
        or: {en: ' or ', ru: ' или '},
        register: {en: ' Register ', ru: ' пройдите регистрацию '},
    },
    loginWith: {
        en: 'Login with STEAM', ru: 'Войти с STEAM'
    },
    home: {
        header: {
            en: 'Exclusive', ru: 'Эксклюзив'
        },
        clock: {
            hour: {
                en: 'Hours', ru: 'Часы'
            },
            minute: {
                en: 'Minutes', ru: 'Минуты'
            },
            second: {
                en: 'Seconds', ru: 'Секунды'
            }
        },
        select_sort: {en: 'Sort', ru: 'Сортировка'},
        select_all: {en: 'All', ru: 'Все'},
        select_comp: {en: 'Competition', ru: 'Соревнования'},
        select_favorite: {en: 'Favorite', ru: 'Популярные'},
        select_not_favorite: {en: 'Recommended', ru: 'Рекомендуемые'},
        select_give: {en: 'Giveaways', ru: 'Раздачи'},
        get_key: {
            en: 'Get the key', ru: 'Получить ключ'
        },
        join_giveaway: {en: 'join to giveaway', ru: 'присоединяйтесь к розыгрышу'},
        join_competition: {en: 'join the competition', ru: 'присоединиться к соревнованию'},
        show_info: {en: 'show information', ru: 'показать информацию'},
        task: {en: 'task', ru: 'задача'},
        taskOne: {en: 'Task One', ru: 'задача 1'},
        taskTwo: {en: 'Task Two', ru: 'задача 2 '},
        taskThree: {en: 'Task Three', ru: 'задача 3'},
        copy: {en: 'Copy', ru: 'Копировать'},
        plus_one: {en: '+1', ru: '+1'},
        visit: {en: 'Visit', ru: 'Посетить'},
        done: {en: 'Done', ru: 'Выполнено'},
        subscribe: {en: 'Subscribe', ru: 'Подписаться'},
        addCom: {en: 'Add Comment', ru: 'Добавить комментарий'},
        repost: {en: 'Repost', ru: 'Репост'},
        cong: {en: 'Congratulations! Take your key', ru: 'Поздравляю! Возьми свой ключ'},
    },
    footer: {
        af_program: {
            en: 'Affiliate program', ru: 'Партнерская программа'
        },
        contacts: {
            en: 'Contacts', ru: 'Контакты'
        }
    },
    admin: {
        btnCreate: {
            en: 'Create a competition', ru: 'Создать конкурс'
        },
        heading: {
            en: 'Admin Panel', ru: 'Админ панель'
        },
        mainTab: {
            en: 'Main', ru: 'Главная'
        },
        mainProfile: {
            en: 'Profile Settings', ru: 'Настройки профиля'
        },
        mainWin: {
            en: 'Achievements', ru: 'Достижения'
        },
        competitionTab: {
            en: 'Competitions', ru: 'Конкурсы'
        },
        usersTab: {
            en: 'Users', ru: 'Пользователи'
        },
        categoryTabs : {en: 'Categories', ru: 'Категории'},
        mainPage: {
            register: {en: 'Registered', ru: 'Зарегистрированных'},
            give: {en: 'Active giveaways', ru: 'Активные раздачи'},
            moder: {en: 'Moderation', ru: 'На модерации'}
        },
        compPage: {
            give: {en: 'Active giveaways', ru: 'Активные раздачи'},
            table: {
                give: {en: 'Competition', ru: 'Конкурс'},
                title: {en: 'Title', ru: 'Заголовок'},
                giveaway: {en: 'Giveaway', ru: 'Раздача'},
                type: {en: 'Type', ru: 'Тип'},
                owner: {en: 'Owner', ru: 'Владелец'},
                created: {en: 'Planned finish or finished', ru: 'Дата окончания/окончен'},
                status: {en: 'Status', ru: 'Статус'},
                edit: {en: 'edit', ru: 'редактировать'},
                draw: {en: 'draw winner', ru: 'победитель розыгрыша'},
                remove: {en: 'remove', ru: 'Удалить'},
                active: {en: 'Active', ru: 'Активен'},
                del: {en: 'Deleted', ru: 'Удален'},
                play: {en: 'Finished', ru: 'Разыгран'},
                moder: {en: 'Moderation', ru: 'На модерации'}
            },
            compCard: {
                comp: {en: 'Competition', ru: 'Конкурс'},
                win: {en: 'Winner', ru: 'Победитель'},
                cond: {en: 'Conditions', ru: 'Условия'},
                prize: {en: 'Prize', ru: 'Приз'},
                status: {en: 'Status', ru: 'Статус'},
                rec: {en: 'Received', ru: 'Получен'}
            },
        },
        userPage: {
            date: {en: 'Registration date', ru: 'Дата регистрации'},
            email: {en: 'email', ru: 'email'},
            votes: {en: 'Points', ru: 'Очки'},
            give: {en: 'Giveaways', ru: 'Раздач'},
            part: {en: 'Participation', ru: 'Участий'},
            link: {en: 'Link', ru: 'Ссылка'},
        },
        createGive: {
            title: {en: 'Add giveaway', ru: 'Добавить раздачу'},
            task: {en: 'Add Task', ru: 'Добавить задачу'},
            subTitle: {en: 'Type of giveaway', ru: 'Тип раздачи'},
            // typeGive: {en: 'Giveaway', ru: 'Раздача'},
            typeGive: {en: 'Competition', ru: 'Конкурс'},
            // give: {en: 'Competition', ru: 'Конкурс'},
            give: {en: 'Giveaway', ru: 'Раздача'},
            start: {en: 'Start:', ru: 'Начало:'},
            end: {en: 'Finish:', ru: 'Окончание:'},
            name: {en: 'Name:', ru: 'Наименование:'},
            desc: {en: 'Description:', ru: 'Описание:'},
            imgLink: {en: 'Image link', ru: 'Ссылка на изображение'},
            primImg: {en: 'Primary image', ru: 'Основное изображение'},
            secImg: {en: 'Secondary image', ru: 'Вторичное изображение'},
            leftImg: {en: 'Left image', ru: 'Левое изображение'},
            rightImg: {en: 'Right image', ru: 'Правое изображение'},
            cond: {en: 'Conditions', ru: 'Условия'},
            btnCreate: {
                en: 'Create a competition', ru: 'Создать конкурс'
            },
            btnUpdate: {
                en: 'Update', ru: 'Обновить'
            },
            btnReturn: {
                en: 'Return', ru: 'Вернутся'
            },
            btnFinishComp: {
                en: 'Finish competition', ru: 'Закончить'
            },
            btnDraw: {
                en: 'Draw winner', ru: 'Обновить'
            },
            btnDrawOther: {
                en: 'Draw other', ru: 'Выбрать'
            },
        }
    },
    user: {
        heading: {en: 'USER PANEL', ru: 'ПАНЕЛЬ ПОЛЬЗОВАТЕЛЯ'},
        part: {en: 'Participation', ru: 'Участие'},
        wins: {en: 'Wins', ru: 'Побед'},
        pend: {en: 'Pending', ru: 'В ожидании'},
        victory: {en: 'Victory', ru: 'Победа'},
        fail: {en: 'Failure', ru: 'Неудача'},
        ongoing: {en: 'Ongoing', ru: 'В процессе'},
        comp: {en: 'Competition', ru: 'Конкурс'},
        own: {en: 'Owner', ru: 'Владелец'},
        date: {en: 'date of creation', ru: 'Дата создания'},
        dateEnd: {en: 'Finish date', ru: 'Дата окончания'},
        amount: {en: 'Number of participants', ru: 'Колличество участников'},
        res: {en: 'Result', ru: 'Результат'},
        gift: {en: 'Your key', ru: 'Твой ключ'},
    }
}

export default function translateReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LANG:
            return {
                ...state,
                lang: action.payload
            }
        default:
            return state
    }
};

export const setLang = (lang) => ({type: SET_LANG, payload: lang})
