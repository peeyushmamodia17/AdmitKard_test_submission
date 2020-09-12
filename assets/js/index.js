const Main = (function () {
  //get teh input from search box
    const searchBox = document.getElementById('search');
    const searchList = document.getElementById('search-results-list');
    let searchResults = [];

    /* Remove all search results from the UI */
    function emptySearchResults() {
        searchList.innerHTML = '';
        searchResults = [];
    }

    //render the search results
    function renderSearchResults(){
        if (!searchResults || searchResults.length === 0) {
            searchList.innerHTML = '<li class="no-results">No results found!</li>';
            return;
        }

        searchResults.forEach((element)=>{
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

      //handle the search as per search box input and give the data
    async function handleSearch(e) {
        //get search term
        const searhTerm = e.target.value;
      
        //if searchterm not present then render all the questions
        if(searhTerm.length==0){
            emptySearchResults();
            Common.renderlist();
            return;
        }
        console.log(searhTerm);
        const url = Common.apiUrl;
    
        // Show loader and remove existing search results
        Common.showLoader();
        emptySearchResults();
    
        try {
          //call apirequest function in common and fetch the api
          const data = await Common.apiRequest(`${url}/search/${searhTerm}`);
          Common.hideLoader();
            console.log(data);
            //if data then return the data to user
          if (data.success) {
            searchResults = data.data.questions;
            renderSearchResults();
          }
        } catch (error) {
          console.log('error', error);
          Common.hideLoader();
        }
      }
      
      //for handle the search function and timeout
      function debounce(func, delay) {
        let timeout;
        return function () {
          const context = this;
          const args = arguments;
    
          clearTimeout(timeout);
    
          timeout = setTimeout(function () {
            timeout = null;
            func.apply(context, args);
            // handleSearch(args);
          }, delay);
        };
      }

    function init() {
        // DONT USE THIS, IT IS DIFF FROM THE BELOW FOEM
        // searchBox.addEventListener('keyup', (e) => {
        //   const debouncedFunction = Common.debounce(handleSearch, 500);
        //   debouncedFunction(e);
        // });
    
        searchBox.addEventListener('keyup',debounce(handleSearch, 500));
      }
    
      return {
        init,
      };

})();