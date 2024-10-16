/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.
*/

(function($) {
let dataObject;
let form = $("#searchForm");
var list = $("#showList");
let show = $("#show");
let back = $("#homeLink");
let link;

let requestConfig1 = {
    method: "GET",
    url:"http://api.tvmaze.com/shows",
    dataType: "json",
    success: function(data) {
        dataObject = data;
    }
};

$("#searchForm").submit(function(event) {
    event.preventDefault();
    let searchTerm = $("#search_term").val();
    try {
        searchTerm = checkSearch(searchTerm);
        list.empty();
        $.ajax({
            method: "GET",
            url: " http://api.tvmaze.com/search/shows?q=" + searchTerm,
            dataType: "json",
            success: function(data) {
                dataObject = data;
            }
        }).then(function(){
            for (let i in dataObject) {
                list.append("<li><a href='" + dataObject[i].show._links.self.href + "'>" + dataObject[i].show.name + "</a></li>");
            }
            show.hide();
            $("a").click(function(event){
                link = $(this).attr("href");
                clicked(event, link);
            })
            list.show();
            back.show();
        })
    } catch(e) {
        alert(e);
    }
});

$(document).ready(function() {
    $.ajax(requestConfig1).then(function(){
        back.hide();
        let name;
        let url;
        for (let i in dataObject) {
            name = dataObject[i].name;
            url = dataObject[i]._links.self.href;
            list.append("<li><a href='" + url + "'>" + name + "</a></li>");
        }
        list.show();
        show.hide();
        $("a").click(function(event){
            link = $(this).attr("href");
            clicked(event, link);
        });
    });
});

back.click(function() {
    location.reload(true);
});

function checkSearch(search) {
    if (!search) throw "You must enter a search term.";
    search = search.trim();
    if (search.length === 0) throw "The search term cannot consist only of spaces.";
    return search;
}

function clicked(event, link) {
    event.preventDefault();
    list.hide();
    show.empty();
    $.ajax({
        method: "GET",
        url: link,
        dataType: "json",
        success: function(data) {
            dataObject = data;
        }
    }).then(function() {
        if (dataObject.name !== undefined) show.append("<h1>" + dataObject.name + "</h1>");
        else show.append("<h1>N/A</h1>");
        if (dataObject.image && dataObject.image.medium) show.append("<img src='" + dataObject.image.medium + "' alt='ShowImage'></img>");
        else show.append("<img src='../images/no_image.jpeg' alt='ShowImage'></img>");
        show.append("<dl id='definitionList'></dl>");
        let definitionList = $("#definitionList");
        definitionList.append("<dt>Language</dt>");
        if (dataObject.language) definitionList.append("<dd>" + dataObject.language + "</dd>");
        else definitionList.append("<dd>N/A</dd>");
        definitionList.append("<dt>Genres</dt>");
        if (dataObject.genres && dataObject.genres.length > 0) {
            definitionList.append("<dd><ul id='genres'></ul></dd>");
            let genres = $("#genres");
            for (let i in dataObject.genres) {
                genres.append("<li>" + dataObject.genres[i] + "</li>");
            }
        }
        else definitionList.append("<dd>N/A</dd>");
        definitionList.append("<dt>Rating</dt>")
        if (dataObject.rating && dataObject.rating.average) definitionList.append("<dd>" + dataObject.rating.average + "</dd>");
        else definitionList.append("<dd>N/A</dd>");
        definitionList.append("<dt>Network</dt>")
        if (dataObject.network && dataObject.network.name) definitionList.append("<dd>" + dataObject.network.name + "</dd>");
        else definitionList.append("<dd>N/A</dd>");
        definitionList.append("<dt>Summary</dt>")
        if (dataObject.summary) definitionList.append("<dd>" + dataObject.summary + "</dd>");
        else definitionList.append("<dd>N/A</dd>");
        show.show();
        back.show();
    });  
}
})(window.jQuery);
