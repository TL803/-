const container = document.getElementById('banks-container')
const banks = [
    {id: 1, name: 'ВТБ', img: '../assets/banks/vtb.svg'},
    {id: 2, name: 'Альфа-банк', img: '../assets/banks/alfa.svg'},
    {id: 3, name: 'Газпромбанк', img: '../assets/banks/gazprom.svg'},
    {id: 4, name: 'ОТП Банк', img: '../assets/banks/otp.svg'},
    {id: 5, name: 'Сбербанк', img: '../assets/banks/sber.svg'},
    {id: 6, name: 'Совкомбанк', img: '../assets/banks/sovcombank.svg'},
    {id: 7, name: 'iBank', img: '../assets/banks/tbank 1.svg'},
    {id: 8, name: 'Zenit Bank', img: '../assets/banks/zenit.svg'},
    {id: 9, name: 'Vector Bank', img: '../assets/banks/Vector.svg'}
];

banks.forEach((bank) => {
    const bankImg = document.createElement('img')
    bankImg.setAttribute('src', `${bank.img}`)
    bankImg.setAttribute('alt', `${bank.img}`)
    container.append(bankImg)
})