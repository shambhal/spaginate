
function getNext(totpages,currentPage,url)
{
	
	 if(currentPage+1<totpages)
	 {
		  t=url.replace('{{}}',i);
		 matches=t.match(/\?/);
		// console.log(matches);
		  if(!matches || matches.length<1)
		 t=t.replace(/&{1}/,'?');
		  return t;
		 
		 
	 }
	
	
}
function getPrev(totpages,currentPage,url)
{
	
	 if(currentPage-1==1)
	 {
		  t=url.replace('{{}}',i);
		 matches=t.match(/\?/);
		// console.log(matches);
		  if(!matches || matches.length<1)
		 t=t.replace(/&{1}/,'?');
		  return t;
		 
		 
	 }
	
	
}
function getArrayPages(limit,totpages,currentPage,url,onclick)
{currentPage=currentPage*1;

	 if (typeof limit !== 'number' || limit < 0)
      throw new Error('express-paginate: `limit` is not a number >= 0');

    if (typeof totpages !== 'number' || totpages < 0)
      throw new Error('express-paginate: `pageCount` is not a number >= 0');

    if ( currentPage*1 < 0)
      throw new Error('spaginate: `currentPage` is not a number >= 0');

    if (limit > 0) {
      var end = Math.min(Math.max(currentPage + Math.floor(limit / 2), limit), totpages);
      var start = (currentPage*1 < (limit - 1)) ? 1 : (end - limit) + 1;
	  var pages=[];
	 for(i=start;i<=end;i++)
	 { //console.log(url);
        //console.log(i);
		if(i==currentPage)
			show=0;
		else
			show=1;
		 t=url.replace('{{}}',i);
		  if(onclick)
			  t2=onclick.replace('{{}}',i);
		 matches=t.match(/\?/);
		// console.log(matches);
		  if(!matches || matches.length<1)
		 t=t.replace(/&{1}/,'?');
		   pages.push({
          number: i,
		  onc:t2.toString(),
		 show:show,
		   url:t});
		 
	 }return pages;
	
}
}
exports.page=function(options,req)
{
var pagew=	options.pagew||'page';
var limit=options.limit||10;
var onclick=options.onclick|| null;
 var url=options.url|| req.url;
 var current_page=options.current_page || 1;
// console.log(current_page+' is current page');
 var totpages=options.totpages||1;
 var apu=0;
  
  if(url.search(pagew)==-1)
  {
	  apu=1;
	  //not added page in url;
	  
			sign='&';
	  url=url+sign+pagew+'={{}}';
	 // console.log(url + ' is url ');
	  
	  
  }
  else{
	  //page is there
	  //console.log("page is there");
	  rep=pagew+'='+current_page;
	  replace=pagew+'='+'{{}}';
	  url=url.replace(rep,replace);
	 // console.log(url);
	  
  }
   
   return{
	   
	   pages:getArrayPages(limit,totpages,current_page,url,onclick),
	   next:getNext(totpages,current_page,url,onclick),
	   prev:getNext(totpages,current_page,url,onclick),
	   
   }
	
	
	
	
	
	
	
	
}