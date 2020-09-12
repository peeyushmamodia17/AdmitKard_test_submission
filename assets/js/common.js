//make a function as name common
const Common = (function () {

    //write all the variables as apiurl
    const apiUrl = `http://localhost:8000/api/v1/questions`;
    const loader = document.querySelector('.loader');
    const searchList = document.getElementById('search-results-list');
    let results=[];

    //function for show loader when it searches
    function showLoader() {
        loader.style.display = 'block';
      }
    
      //function for hide loader when content gets
      function hideLoader() {
        loader.style.display = 'none';
      }

    
       /* Send api requests */
    async function apiRequest(url) {
        try {
        //fetch the api url and save in response
        const response = await fetch(url);
        //convert response in json format
        const data = await response.json();

        //return the data
        return {
            data,
            success: true,
        };
        } catch (error) {
        console.log('error', error);
        return {
            error: error.message,
            success: false,
        };
        }
    }

    //function for rendering the list of questions
      async function renderlist(){
          //find data by call apirequest function
          const data=await apiRequest(apiUrl);
          console.log(data);
          if (data.success) {
              //send the data
            results = data.data.questions;
            //call render function for all the list items with data on UI
            renderSearchResults();
          }
        
      }

      //render question data on UI
      function renderSearchResults(){
          //if results length is 0 then
        if (!results || results.length === 0) {
            searchList.innerHTML = '<li class="no-results">No results found!</li>';
            return;
        }

        //run forEach on results for rendering every question
        results.forEach((element)=>{
            const li = document.createElement('li');
            li.classList.add('search-result');
            li.innerHTML= `
                    <div class="query">
                        <h2>${element.query}</h2>
                    </div>
                    <div class="Topic">
                        <h3>Topic : ${element.topic} </h3>

                    </div>
                    <div class="Tags">
                        <p>Tags : ${element.tags} </p>
                    </div>
                `;
            searchList.appendChild(li);
        });
      }

      renderlist();

      //return all needed functions
      return {
        apiRequest,
        apiUrl,
        showLoader,
        hideLoader,
        renderlist,
      };

})();