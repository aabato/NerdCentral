console.log("Bloop");

var $PageTitle = $('.jumbotron')
var $container = $('.container')
var $table = $('table')
var $tr = $('tr')
var $showText=$('.showText')
var $modal=$('.pew-pew')
var $btn=$('.btn btn-primary')

var $response = 'null';

$table.hide(0);

$PageTitle.css({
	opacity: 0});

$PageTitle.animate({
	opacity: 1,
	height: '100%'
	}, 2000);

$('.btnHP').on('click', function(e){
	console.log(e);
	$response = $.getJSON('http://www.reddit.com/r/harrypotter.json');
	makeCall();
	console.log($response);
})

$('.btnGT').on('click', function(e){
	console.log(e);
	$response = $.getJSON('http://www.reddit.com/r/gameofthrones.json');
	makeCall();
	console.log($response);
})

$('.btnNS').on('click', function(e){
	console.log(e);
	$response = $.getJSON('http://www.reddit.com/r/neuroscience.json');
	makeCall();
	console.log($response);
})

$('.btnMU').on('click', function(e){
	console.log(e);
	$response = $.getJSON('http://www.reddit.com/r/Albumoftheday.json');
	makeCall();
	console.log($response);
})

$('.btnMO').on('click', function(e){
	console.log(e);
	$response = $.getJSON('http://www.reddit.com/r/movies.json');
	makeCall();
	console.log($response);
})


function makeCall() {
	$response.done(function(data){
		$table.hide(0);
		$table.find("tr:gt(0)").remove();

		var posts = data.data.children.map(function(post){
			return {
				id: post.data.id,
				title: post.data.title,
				author: post.data.author,
				publish: post.data.created_utc,
				link: post.data.permalink,
				text: post.data.selftext
				} ;
		});

		var fragment = document.createDocumentFragment();
		for (var i = posts.length - 1; i >= 0; i--) {
			var row = document.createElement('tr');
			var td0 = document.createElement('td');
			var td1 = document.createElement('td');
			var td2 = document.createElement('td');
			var td3 = document.createElement('td');

			td0.innerHTML = posts[i].id;
			row.appendChild(td0);

			td1.innerHTML = '<a href="http://www.reddit.com/' + posts[i].link +'">' + posts[i].title + '</a>';
			row.appendChild(td1);
			
			td2.innerHTML = posts[i].author;
			row.appendChild(td2);

			td3.innerHTML = posts[i].publish;
			row.appendChild(td3);

			fragment.appendChild(row);

			// console.log(posts[i].text);

		};	

		$table.append(fragment);

		$table.show(500);

		$('tr a').on('click', function(e) {
			e.stopPropagation();
		})

		$('tr').on('click', function(e){

			var modal = document.createElement('div');
			modal.className = 'pew-pew';
			var originalState = $modal.html();

			for (var i = 0; i <= posts.length; i++){
				if ( posts[i].id == e.currentTarget.firstChild.innerHTML ) {
					console.log(posts[i].id);
					var postText = document.createElement('p');
					var postTitle = document.createElement('h2');

					postText.innerHTML = posts[i].text;
					postTitle.innerHTML = posts[i].title;
					console.log(postText);

					$modal.html(originalState);
					modal.appendChild(postTitle);
					modal.appendChild(postText);

					document.body.appendChild(modal);

					$('#page-wrap').fadeTo(200,0.2);

					$('.pew-pew').on('click', function(e) {
						console.log(e);
						$('.pew-pew').remove();
						$('#page-wrap').fadeTo(1000,1);
					});

					break;
				}
			}
		});

	}); 
};





