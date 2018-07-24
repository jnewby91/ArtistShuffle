const lastFmURL = 'https://ws.audioscrobbler.com/2.0/';
const iTunesURL = 'https://itunes.apple.com/search?';


var artistSelector = Math.floor((Math.random()*10) + 0);
var previewSelector = Math.floor((Math.random()*5) + 0);

var lastFmData; 
var iTunesData;


function getLastFMdata(searchTerm, callback) {
	const param = {
    method: 'artist.getsimilar',
		api_key: 'bfe9c08eaf78508d5aa1f2009aadeaae',
        artist: `${searchTerm}`,
        limit: 10,
        format: 'json'
	};
	 $.getJSON(lastFmURL,param, callback);
}

function getiTunesdata(searchTerm, callback ){ 
    const param = {
      term: encodeURIComponent(searchTerm).replace(/%20/g, '+'), 
      country: 'US',
      limit : 5
    }
    $.getJSON(iTunesURL,param, callback);
  }

function firstCall(result) {
    console.log(result);
    lastFmData = result;
    const likeArtist = result.similarartists.artist[artistSelector].name;
    console.log(likeArtist);

    getiTunesdata(likeArtist,function(data){
        console.log('this is is what the data is:', data);
        $('.js-audioQuests').html(secondCall(data))   
    })
    // $('.js-audioQuests').html(getiTunesdata(likeArtist, secondCall));

}

function secondCall(result){
   iTunesData = result; 

   return `
        <h2> Do You Know the Artist to this Song? </h2>
        <h3>${result.results[previewSelector].trackName} </h3>
        <audio controls>
        <source src=${result.results[previewSelector].previewUrl} type='audio/mp4'>
        </audio> 
        <button type="button" id="knownButton">Yes, I know the Artist of this Song!</button>
        <button type="button" id="unknownButton">Don't Know the Artist to this Song?</button>
        <button type="button" id="tryAgainButton">Start Another Search</button>
        `
}

function hidePage(target){

    $(target).hide();
}

function showSongInformation(data){
    return `
        <h2> The Artist you just heard is: ${data.results[previewSelector].artistName}</h2>
        <img src=${data.results[previewSelector].artworkUrl100}/>
        <h3>Song Name: ${data.results[previewSelector].trackName}</h3>
        <h3>Album Name: ${data.results[previewSelector].collectionName}</h3>
        <button type="button" id="#tryAgainButton">Start Another Search</button>
        `
}

function showMusicInfomation(data){
        console.log('the beginning of the showMusicInfomation function')
    $('.js-audioQuests').on('click','#unknownButton', function(){
        hidePage('.js-audioQuests');
        $('.js-resultPage').html(showSongInformation(iTunesData)); 
        console.log('this actually ran');
    });
}

function nextArtistSearch(){
    console.log('the beginning of nextArtistSearch function')
    $('.js-audioQuests').on('click','#knownButton', function(){
        artistSelector = Math.floor((Math.random()*10) + 0);
        previewSelector = Math.floor((Math.random()*10) + 0);
        $('.js-audioQuests').html(firstCall(lastFmData));
        console.log('the function ran');
    });
}


function getData() {
	$('.searchForm').submit(function(event) {
		event.preventDefault();
        const searchVal = $('#search').val();
        hidePage('.js-homePage');
		console.log(searchVal);
        getLastFMdata(searchVal, firstCall);
       
	});
}



$(function(){
    getData();
    showMusicInfomation();
    nextArtistSearch();

});
