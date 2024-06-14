// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
const url = 'https://jsonplaceholder.typicode.com/users';

async function userArray(){
    const result = await fetch(url)
    return result.json()
    // console.log(userArray())
}

async function ShowUsers(){
    const user = await userArray()
    user.forEach(user=> {
    // 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
        let div = document.createElement("div")
        div.classList.add("FirstBlock")

        let divForInfo = document.createElement("div")
        divForInfo.classList.add("InfoBlock")

        divForInfo.innerHTML = `${user.id} ${user.name}`
    // 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
        let button = document.createElement("button")
        button.classList.add("UserButton");
        button.innerHTML = 'more info'
        button.onclick = function () {
            window.location.href = `user-details.html?id=${user.id}`;
        };

        div.append(divForInfo, button)
        document.body.append(div)
    })

}
ShowUsers()

// done