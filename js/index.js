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
            theArticleContainer.innerHTML=""
            const paginationElement=document.querySelectorAll(".number");
            paginationElement.forEach(element=>{
                element.classList.remove("on");
            })
            // we target the element using the e argument to point to the element directly
            const theTargetHTML=e.target;
            const theTarget=theTargetHTML.textContent;
            const currentElement=theTargetHTML;
           indexOne=(theTarget-1)*5;
           indexTwo=theTarget*5;
           currentElement.classList.add('on');
           console.log(theTargetHTML);
        
           // calling the appendElementArticle() function which is a function containing the limited data from the api considering the api has 100 elements, we would like to display only a few.( 5 to be precise)
           appendElementArticle();
        }
        // we call the appendElement for the default display
        appendElementArticle();

        // creating the function appendElementArticle() in order to be able to reuse it up there
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
            theArticleContainer.appendChild(post);
            
        });
       }
       // creating a logic to be able to calculate the number of page we would have considering the amount of data we have only to be able to show 5 elements at once.
        const totalPages=data.length/5;
        // after determining the number of pages we will have, we populate them in an array using the logic below
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
// calling the fecthData() Function which is an async function.
fetchData();
