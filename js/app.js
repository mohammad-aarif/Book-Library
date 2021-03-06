// API fetch and Search Query
document.getElementById('search-btn').addEventListener('click', () =>{
    let query = document.getElementById('search-text').value;
    const url = `https://openlibrary.org/search.json?q=${query}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBook(data));
    document.getElementById('search-text').value = '';
    toggleElemnents('none', 'block', 'none')
});

// Toggle Elements Function 
const toggleElemnents = (container, loading, count) =>{
    document.getElementById('container').style.display = container;
    document.getElementById('loading').style.display = loading;
    document.getElementById('resultCount').style.display = count;
}

// Display Data Function
const displayBook = data => {
    toggleElemnents('grid', 'none', 'block')
    const results = data.docs
    let i = 1;

    // Check Result 
    const container = document.getElementById('container');
    if(results.length === 0){
        document.getElementById('resultCount').innerHTML =`No result found`;
    }
    container.textContent = '';

    // Display individual Data 
    results?.forEach(book => {
        // Image Validation
        if(book.cover_i){
            var imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        }
        else{
            var imgUrl = `../img/dummy-image.jpg`
        }

        // Create And Append HTML elemnts 
        const div = document.createElement('div')
        div.classList.add('book')
        div.innerHTML = `
        <img src="${imgUrl}" alt="">
        <h3>${book?.title}</h3> 
        <p>By <span><b>${book?.author_name?.[0] ? book?.author_name?.[0]: "Unknown Author"}</b></span></p>
        <p>Publisher: <span>${book?.publisher?.[0] ? book?.publisher?.[0]: "Unknown Publisher"}</span></p>
        <p>Publish Date: ${book?.publish_date?.[0] ? book.publish_date?.[0]: "Date not found"}</p>
        `;
        container.appendChild(div);
        document.getElementById('resultCount').innerHTML =`Total <b>${i++}</b> result found`
    })
}