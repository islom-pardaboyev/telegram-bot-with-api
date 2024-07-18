let elUserList = document.querySelector(".users-list");
let moreModal = document.querySelector("#moreModal");

function getUsers() {
    axios.get('https://reqres.in/api/users').then(res => {
        res.data.data.forEach(item => {
            let div = document.createElement("div");
            div.className = "w-[30%] bg-blue-500 text-center text-white rounded-xl p-5";
            div.innerHTML = `
                <img width="100" class="mx-auto rounded-full" src="${item.avatar}" alt="">
                <h2 class="text-xl font-bold">${item.first_name} ${item.last_name}</h2>
                <a href="mailto:${item.email}" class="underline"><b>User Email:</b> ${item.email}</a>
                <p><b>UserID:</b> ${item.id}</p>
                <button class="btn more-btn">More Btn</button>
            `;
            elUserList.append(div);

            div.querySelector('.more-btn').addEventListener('click', () => showModal(item));
        });
    });
}

function showModal(user) {
    moreModal.innerHTML = `
        <div class="p-5 rounded-md absolute bg-white top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <i onclick="closeModal()" class="fa-solid fa-xmark absolute top-3 cursor-pointer text-xl w-[30px] h-[30px] flex items-center justify-center bg-red-500 rounded-full hover:bg-red-700 transition-all duration-300 text-white right-3"></i>
            <div class="flex items-center gap-[100px]">
                <img class="rounded-md" src="${user.avatar}" alt="">
                <div class="flex flex-col gap-2 items-start">
                    <p><b>UserID:</b> ${user.id}</p>
                    <p><b>User Full Name:</b> ${user.first_name} ${user.last_name}</p>
                    <p><b>Email:</b> ${user.email}</p>
                    <a onclick="getSingleUser(${user.id}); closeModal();" href="https://t.me/+eR1WTiZvSZIzNDAy" class="px-5 py-2 bg-blue-500 rounded-md text-white font-medium" target="_blank">View By <span class="underline">Telegram Channel</span></a>
                </div>
            </div>
        </div>
    `;
    moreModal.classList.add("scale-100");
}
function closeModal() {
    moreModal.classList.remove("scale-100");
}

getUsers();

let CHAT_ID = "-1002186511323";
let TOKEN = "7440990314:AAG2tywwK1zqQNSQNRoTkJd61jCEXugR7VY";
let URL = `https://api.telegram.org/bot${TOKEN}`;

function getSingleUser(id) {
    axios.get(`https://reqres.in/api/users/${id}`).then(res => {
        let message = `Sit Order\n`;
        message += `Full Name: ${res.data.data.first_name} ${res.data.data.last_name}\n`;
        message += `Email: ${res.data.data.email}\n`;

        // Send the photo
        axios.post(`${URL}/sendPhoto`, {
            chat_id: CHAT_ID,
            photo: res.data.data.avatar,
            caption: message,
            parse_mode: "HTML"
        }).then(res => {
            console.log(res);
        });
    });
}