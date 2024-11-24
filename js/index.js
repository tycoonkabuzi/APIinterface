const theArticleContainer=document.getElementById('article');// calling the element article which is going to take all our posts
const paginationContainer=document.querySelector('.pagination');// calling pagination which is also a container of all the number of pages.

// fetching elements from the api jsonplaceholder.typicode.com/posts? using the function fetchData() created below
async function fetchData(){
    const urlApi=`https://jsonplaceholder.typicode.com/posts?page}`;// created a variable taking the link pointing to our API
    
    try{
        const response=await fetch(urlApi);// fetching elements using the variable urlApi we created earlier
        // in case the response does not come or if there is an error, could be network or whatever , we through the error in the response.status.
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        //else we now put the data we have receved transform them from JSON to an array
        const data= await response.json();
        // here we try to create initial value for the firsts 5 element to be displayed by default
        let indexOne=0; //5+5+5
        let indexTwo=5;//5*2*2

        // creating a function that is going to update content based on whenever we click to the boutton of a page 
        function updateContent(e){
            // we target the element using the e argument to point to the element directly
            const theTargetHTML=e.target;
            const theTarget=theTargetHTML.textContent;
           indexOne=theTarget;
           indexTwo=theTarget*5;
           theTargetHTML.classList.add('on');
           appendElementArticle();
        }
        appendElementArticle();
       function appendElementArticle(){
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
       }
        const totalPages=data.length/5;
        const arrayPages=[];
        for (i=1;i<totalPages;i++){
            arrayPages.push(i);
        }
        arrayPages.forEach(element=>{
            const pageNumber=document.createElement('div')
            pageNumber.textContent=element;
            pageNumber.className="number"
            paginationContainer.appendChild(pageNumber);
            pageNumber.addEventListener("click",updateContent);
        });
        //console.log(arrayPages);
    }
    catch(error){
        console.log("It did not work",error)
    }


}
fetchData();
console.log("Tycoon");