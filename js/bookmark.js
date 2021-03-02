// JavaScript Document

// Script developed by the U.S. Environmental Protection Agency, modified by NOAA National Ocean Service
// 16 April 2009
// In the object literal, to prevent name clashes

var nosCore = {

	
	showHideSwap : function(id1,id2) {
		var id1c = document.getElementById(id1); var id2c = document.getElementById(id2);
		if (id1c.className == 'hide' && id2c.className == 'post') {
			id1c.className = 'show'; id2c.className = 'postFrame';
		} else {
			id1c.className = 'hide'; id2c.className = 'post';
		}
	},
	
	articleShare : function(site) {
		var popUpUrl = encodeURIComponent(window.location.href);
		var title = encodeURIComponent(document.title);
		var description = '';
		switch (site) {
			case "slashdot": nosCore.postPopUp('http://slashdot.org/slashdot-it.pl?op=basic&url='+popUpUrl, 'slashdot', 'toolbar=0,status=0,height=600,width=600,scrollbars=yes,resizable=yes');
			break;
			case "facebook": nosCore.postPopUp('http://www.facebook.com/sharer.php?u='+popUpUrl + '&t=' + title, 'facebook', 'toolbar=0,status=0,height=436,width=646,scrollbars=yes,resizable=yes');
			break;
			case "digg": nosCore.postPopUp('http://digg.com/remote-submit?phase=2&url='+popUpUrl + '&title=' + title, 'digg', 'toolbar=0,status=0,height=450,width=650,scrollbars=yes,resizable=yes');
			break;	
			case "delicious": nosCore.postPopUp('http://delicious.com/save?jump=close&v=4&noui&jump=close&url='+popUpUrl + '&title=' + title, 'delicious', 'toolbar=0,status=0,height=400,width=700,scrollbars=yes,resizable=no');
			break;			
			case "reddit": nosCore.postPopUp('http://reddit.com/submit?url='+popUpUrl+'&title=' + title, 'reddit', 'toolbar=0,status=0,height=400,width=700,scrollbars=yes,resizable=no');
			break; 
			case "stumble": nosCore.postPopUp('http://www.stumbleupon.com/submit?url='+popUpUrl+'&title=' + title, 'stumble', 'toolbar=0,status=0,height=400,width=700,scrollbars=yes,resizable=no');
			break; 
			case "twitter": nosCore.postPopUp('http://twitter.com/home?status='+title + ' ' + popUpUrl, 'twitter', 'toolbar=0,status=0,height=400,width=700,scrollbars=yes,resizable=no');
			break; 
			case "whatisthis": window.location='http://www.oceanservice.noaa.gov/bookmarks.html';
			break; 
		}
	},
	
	postPopUp :function(url, name, params) { var win = window.open(url, name, params); },
	
	addPostItem : function(parentElement, style, post_link, text) {
		var postItem = document.createElement("li"); postItem.className = style;
		var itemLink = document.createElement("a");
		itemLink.setAttribute("href", post_link); itemLink.innerHTML = text;
		
		postItem.appendChild(itemLink); parentElement.appendChild(postItem);
	},
	
	writePost : function() {
		if(!document.getElementById('banner')) return;
		if (document.getElementById('aara')) return;
		var banner = document.getElementById("banner");
		var parentElement = document.createElement("ul");
		parentElement.id = "bookmarkList";
		
		//create post li
		var postElement = document.createElement("li");
		postElement.className = "post"; postElement.setAttribute("id", "post");
		// create post link
		var postLink = document.createElement("a"); postLink.setAttribute("href", "#");
		postLink.onclick = function () { nosCore.showHideSwap('postList', 'post'); return false; };
		postLink.innerHTML = "SHARE";
		postElement.appendChild(postLink);
		
		// create unordered list for post items
		var postList = document.createElement("ul");
		postList.setAttribute("id","postList");	postList.className = "hide";
		
		//add post links
		nosCore.addPosts(postList);
		
		postElement.appendChild(postList);
		parentElement.appendChild(postElement);
		banner.appendChild(parentElement);
	},
	
	addPosts : function(shareList) {	
		var sList;
		if(typeof(shareList)=='string') { sList = document.getElementById(shareList); }
		else if(typeof(shareList)=='object') { sList = shareList; }
		else return false;
	
		nosCore.addPostItem(sList, "delicious", "javascript:nosCore.articleShare('delicious');", "Delicious");
		nosCore.addPostItem(sList, "digg", "javascript:nosCore.articleShare('digg');", "Digg");
		nosCore.addPostItem(sList, "facebook", "javascript:nosCore.articleShare('facebook');", "Facebook");
		nosCore.addPostItem(sList, "reddit", "javascript:nosCore.articleShare('reddit');", "Reddit");
		nosCore.addPostItem(sList, "slashdot", "javascript:nosCore.articleShare('slashdot');", "Slashdot");
		nosCore.addPostItem(sList, "stumble", "javascript:nosCore.articleShare('stumble');", "StumbleUpon");
		nosCore.addPostItem(sList, "twitter", "javascript:nosCore.articleShare('twitter');", "Twitter");
		nosCore.addPostItem(sList, "whatisthis", "javascript:nosCore.articleShare('whatisthis');", "What is this?");
	}
	

}; // end nosCore

function addEvent( obj, type, fn ) {
	if (document.getElementById && document.createTextNode) {
		if (obj.addEventListener)
			obj.addEventListener( type, fn, false );
		else if (obj.attachEvent) {
			obj['e'+type+fn] = fn;
			obj[type+fn] = function() { obj['e'+type+fn]( window.event ); }
			obj.attachEvent( 'on'+type, obj[type+fn] );
		}
	}
}
	
	
	addEvent(window, 'load', nosCore.writePost);
