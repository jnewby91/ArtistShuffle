const lastFmURL = 'https://ws.audioscrobbler.com/2.0/';
const iTunesURL = 'https://itunes.apple.com/search?';

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
    const likeArtist = result.similarartists.artist[0].name;
    console.log(likeArtist);

    getiTunesdata(likeArtist,function(data){
        console.log('this is is what the data is:', data);
        $('.js-audioQuests').html(secondCall(data))   
    })
    // $('.js-audioQuests').html(getiTunesdata(likeArtist, secondCall));

}

function secondCall(result){
    // console.log(result.results[0].previewUrl); 
   // const songPreview = '';
   return `<audio controls>
        <source src=${result.results[0].previewUrl} type='audio/mp4'>
        </audio> `
}


function getData() {
	$('.searchForm').submit(function(event) {
		event.preventDefault();
		const searchVal = $('#search').val();
		console.log(searchVal);
		getLastFMdata(searchVal, firstCall);
	});
}



$(getData);
