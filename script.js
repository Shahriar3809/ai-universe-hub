

const loadData = (isSorted) => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(resolve => resolve.json())
    .then(alldata => {
        const data = alldata.data.tools;
        const itemContainer = document.getElementById('item-container');


        if(isSorted) {
            data.sort((a, b) => {
                const first = a.published_in
                const second = b.published_in
                const converted1 = parseInt(first.slice(5,9))
                const converted2 = parseInt(second.slice(5))
                console.log(converted1)
                return converted2 - converted1;
            })
        }


        itemContainer.textContent = '';

        data.forEach(item => {
            // console.log(item)
            const div = document.createElement('div')
            div.innerHTML = `
                <div class="card max-w-80 bg-base-100  shadow-xl">
                    <figure class="p-3">
                        <img src="${item.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                <div class="card-body p-2 text-center">
                    <h2 class="card-title">Feature</h2>
                    <ul class="text-left">
                        <li>${item.features[0]}</li>
                        <li>${item.features[1]}</li>
                        <li>${item.features[2]}</li>
                    </ul>
                    <hr>
                    <div class="card-actions flex justify-between w-full">
                        <div>
                            <h3 class="text-2xl font-bold">${item.name}</h3>
                            <p>${item.published_in}</p>
                        </div>
                        <button onclick="details('${item.id}')" class="btn btn-primary detailtsBtn"> > </button>
                    </div>
                </div>
                </div>
                        
            `
            itemContainer.appendChild(div);
             

        });



    })
}


let isSorted = false;





loadData(isSorted)

const sortBtn = document.getElementById('sortBtn');
sortBtn.addEventListener('click', function () {
    isSorted = true;
    loadData(isSorted)
})



const details= (id) =>{
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(resolve => resolve.json())
    .then(alldata => {
        const data = alldata.data;

        showDetails(data)

        
        
    })
}


const showDetails = (data) => {
    console.log(data)
    const containerofdetals = document.getElementById('containerofdetals');

    containerofdetals.innerHTML = ` <div>
                    <p>${data.description}</p>
                    <div class="flex gap-3 p-3">
                        <div id="item1">${data.pricing[0].price} for ${data.pricing[0].plan}</div>
                        <div id="item2">${data.pricing[1].price} for ${data.pricing[1].plan}</div>
                        <div id="item3">${data.pricing[2].price} for ${data.pricing[2].plan}</div>
                        
                    </div>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                </div>
                <div>
                    <img src="${data.image_link[0]}" alt="">
                    <p class="font-bold text-2xl">${data.input_output_examples[0].input}</p>
                    <p>${data.input_output_examples[1].output}</p>
            </div>`
    
   

           


    OpenModals.showModal()
}
