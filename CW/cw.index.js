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
        let divAll = document.createElement("div")
        divAll.classList.add("FirstBlock")
        divAll.style.display = "flex"
        divAll.style.backgroundColor = "RoyalBlue"




        let divForInfo = document.createElement("div")
        divForInfo.classList.add("InfoBlock")
        divForInfo.style.padding = "10px";
        divForInfo.style.backgroundColor = "LightCyan"
        divForInfo.style.margin = "7.4px"
        divForInfo.style.display = "flex"
        divForInfo.style.textAlign = "center"
        divForInfo.style.width = "20vw"
        divForInfo.style.height="5vh"
        divForInfo.style.justifyContent = "space-between"
        divForInfo.style.border ="1px solid blue"
        divForInfo.style.borderRadius = "10px"


        divForInfo.innerHTML = `${user.id}. ${user.name}`
    // 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
        let button = document.createElement("button")
        button.classList.add("UserButton");
        button.style.backgroundColor = "DodgerBlue"
        button.style.borderRadius = "25px"
        button.style.width="6vw"
        button.style.color="white"
        button.innerHTML = 'more info'
        button.onclick = function () {
            window.location.href = `user-details.html?id=${user.id}`;
        };
        divForInfo.appendChild(button)
        divAll.appendChild(divForInfo)
        document.body.append(divAll)
    })

}
ShowUsers()

// done