const mongoose = require('mongoose');
const config = require('./config');
const Album = require('./models/Album');
const Artist = require('./models/Artist');
const Track = require('./models/Track');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [tsoi, cranberries, ennio] = await Artist.create(
        {name: 'В. Цой', description: '«Кино́» — одна из самых популярных советских рок-групп 1980-х годов. Лидером и автором практически всех текстов и музыки неизменно оставался Виктор Цой, после смерти которого коллектив, выпустивший в общей сложности за девять лет на студийных альбомах более ста песен, несколько сборников и концертных записей, а также большое количество неофициальных бутлегов, прекратил существование.', image: 'kino.jpg'},
        {name: 'Cranberries', description: 'The Cranberries — ирландская рок-группа, созданная в Лимерике в 1989 году, под названием The Cranberry Saw Us. The Cranberries выпустила семь студийных альбомов, два мини-альбома и двадцать два сингла.\n' +
                '\n' +
                'Дебютным альбомом The Cranberries стал Everybody Else Is Doing It, So Why Can’t We?, который был успешным и получил статусы (2× платиновый в Великобритании и 5× платиновый в США). Их следующий альбом No Need to Argue стал самым продаваемым студийным альбомом группы. Коллектив достиг 1 места в UK Albums Chart (Everybody Else Is Doing It, So Why Can’t We?) и 2 места в чарте Modern Rock Tracks («Zombie» и «Salvation»). Последний студийный альбом группы Something Else был выпущен 28 апреля 2017 года на лейбле BMG[1].', image: 'cranberries.jpg'},
        {name: 'Ennio Morricone', description: 'Э́ннио Моррико́не (итал. Ennio Morricone; род. 10 ноября 1928, Рим) — итальянский композитор, аранжировщик и дирижёр. В основном пишет музыку для кино и телевидения. Великий офицер ордена «За заслуги перед Итальянской Республикой». Обладатель двух премий «Оскар»: за выдающиеся заслуги в кинематографе (2007) и за лучшую музыку — к «Омерзительной восьмёрке» (2016), 9-кратный лауреат национальной кинопремии Италии «Давид ди Донателло» за лучшую музыку к фильму, трёхкратный лауреат премии «Золотой глобус», 6-кратный лауреат премии BAFTA и многих других.', image: 'ennio.jpg'},

    );

    const [tsoi_45, tsoi_gruppa, tsoi_zvezda, cranberries_no_argue, cranberries_bury, cranberries_in_the_end, ennio_good_bad, ennio_once_upon, ennio_fistful] = await Album.create(
        {
            title: '«45»',
            artist: tsoi._id,
            year: '1982',
            image: '45_kino.jpg'
        },
        {
            title: '«Группа крови»',
            artist: tsoi._id,
            year: '1988',
            image: 'gruppa_krovi.jpg'
        },
        {
            title: '«Звезда по имени Солнце»',
            artist: tsoi._id,
            year: '1989',
            image: 'zvezda_solnce.jpg'
        },
        {
            title: 'No Need to Argue',
            artist: cranberries._id,
            year: '1994',
            image: 'no_need_argue.jpeg'
        },
        {
            title: 'Bury the Hatchet',
            artist: cranberries._id,
            year: '1999',
            image: 'bury_the_hatchet.jpg'
        },
        {
            title: 'In the End',
            artist: cranberries._id,
            year: '2019',
            image: 'in_the_end.jpeg'
        },
        {
            title: 'The Good, The Bad & The Ugly',
            artist: ennio._id,
            year: '1967',
            image: 'good_bad_ugly.jpg'
        },
        {
            title: 'Once Upon a Time in the West',
            artist: ennio._id,
            year: '1969',
            image: 'once_upon_atime.jpg'
        },
        {
            title: 'A Fistful Of Dollars',
            artist: ennio._id,
            year: '1967',
            image: 'fistful.jpg'
        }
    );

    await Track.create(
        {
            title: 'Аллюминевые огурцы',
            album: tsoi_45._id,
            duration: '2,56',
            number: 1
        },
        {
            title: 'Электричка',
            album: tsoi_45._id,
            duration: '2,34',
            number: 2
        },
        {
            title: 'Восьмиклассница',
            album: tsoi_45._id,
            duration: '2,44',
            number: 3
        },
        {
            title: 'Группа крови',
            album: tsoi_gruppa._id,
            duration: '4,44',
            number: 1
        },
        {
            title: 'Закрой за мной дверь',
            album: tsoi_gruppa._id,
            duration: '4,16',
            number: 2
        },
        {
            title: 'Прохожий',
            album: tsoi_gruppa._id,
            duration: '3,38',
            number: 3
        },
        {
            title: 'Звезда по имени Солнце',
            album: tsoi_zvezda._id,
            duration: '3,46',
            number: 1
        },
        {
            title: 'Пачка сигарет',
            album: tsoi_zvezda._id,
            duration: '4,28',
            number: 2
        },
        {
            title: 'Печаль',
            album: tsoi_zvezda._id,
            duration: '5,32',
            number: 3
        },
        {
            title: 'Ode to My Family',
            album: cranberries_no_argue._id,
            duration: '4.31',
            number: 1
        },
        {
            title: 'Zombie',
            album: cranberries_no_argue._id,
            duration: '5.07',
            number: 2
        },
        {
            title: 'No need to argue',
            album: cranberries_no_argue._id,
            duration: '2.54',
            number: 3
        },
        {
            title: 'Animal Instinct',
            album: cranberries_bury._id,
            duration: '3.31',
            number: 1
        },
        {
            title: 'Loud and clear',
            album: cranberries_bury._id,
            duration: '2.45',
            number: 2
        },
        {
            title: 'Linger',
            album: cranberries_bury._id,
            duration: '4.38',
            number: 3
        },
        {
            title: 'All Over Now',
            album: cranberries_in_the_end._id,
            duration: '4.15',
            number: 1
        },
        {
            title: 'Catch Me If You Can',
            album: cranberries_in_the_end._id,
            duration: '3.48',
            number: 2
        },
        {
            title: 'In the End',
            album: cranberries_in_the_end._id,
            duration: '4.26',
            number: 3
        },
        {
            title: 'The good, the bad and the ugly',
            album: ennio_good_bad._id,
            duration: '2.38',
            number: 1
        },
        {
            title: 'The Desert',
            album: ennio_good_bad._id,
            duration: '5.11',
            number: 2
        },
        {
            title: 'Marcia',
            album: ennio_good_bad._id,
            duration: '2.49',
            number: 3
        },
        {
            title: 'Once Upon a Time in the West',
            album: ennio_once_upon._id,
            duration: '3.43',
            number: 1
        },
        {
            title: 'Farewell to Cheyenne',
            album: ennio_once_upon._id,
            duration: '2.37',
            number: 2
        },
        {
            title: 'The Transgression',
            album: ennio_once_upon._id,
            duration: '4.40',
            number: 3
        },
        {
            title: 'Theme from A Fistful of Dollars',
            album: ennio_fistful._id,
            duration: '1.48',
            number: 1
        },
        {
            title: 'The Result',
            album: ennio_fistful._id,
            duration: '2.36',
            number: 2
        },
        {
            title: 'The Chase',
            album: ennio_fistful._id,
            duration: '2.25',
            number: 3
        }
    );

    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});