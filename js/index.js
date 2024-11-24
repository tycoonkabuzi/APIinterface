const theArticleContainer=document.getElementById('article');
const paginationContainer=document.querySelector('.pagination');
async function fetchData(){
    const urlApi=`https://jsonplaceholder.typicode.com/posts?page}`;
    try{
        const response=await fetch(urlApi);
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data= await response.json();
        const indexOne=15; //5+5+5
        const indexTwo=20;//5*2*2
        const limitedPosts=data.slice(indexOne,indexTwo);
        limitedPosts.forEach(element => {
            const post=document.createElement('div');
            post.className="post";
            const title=document.createElement('h1');
            const paragraph=document.createElement('p');
            title.textContent=element.title;
            paragraph.textContent=element.body;
            post.appendChild(title);
            post.appendChild(paragraph);
            theArticleContainer.appendChild(post)
        });
        const totalPages=data.length/5;
        const arrayPages=[];
        for (i=0;i<totalPages;i++){
            arrayPages.push(i);
        }
        console.log(arrayPages);
    }
    catch(error){
        console.log("It did not work",error)
    }


}
fetchData();
console.log("Tycoon");