 // This submission is for assignment for Full Stack Developer Training at Invide 
 // Datetime Of Submission : 07-05-2021, 18:00 hrs
 // Student Name :  Soumita Roy
 // License : MIT


 //Posting data in home page
 //Contains The home page details
 detailsforhomepage();
 function detailsforhomepage(){
 var retrievedData = localStorage.getItem("url_ls");
 var url = JSON.parse(retrievedData);
 retrievedData = localStorage.getItem("title_ls");
 var title = JSON.parse(retrievedData);
 retrievedData = localStorage.getItem("n");
 var n = JSON.parse(retrievedData);
 retrievedData = localStorage.getItem("timestamp_ls");
 var timestamp = JSON.parse(retrievedData);
 var curr = Date.now()
 // html=''
 html = []
 for (i = 0; i < n; i++) {
     var elsp = timeDifference(timestamp[i], curr);
     var comment_count = 0
     var temp = "cmt_ls" + i.toString()
     if (localStorage.getItem(temp)) {
         comment_count = JSON.parse(localStorage.getItem(temp)).length;
     }

     //Code without sorting the elements according to the number of votes

     //    html += '<div class="news_list"><span class="numbering">'+(i+1)+'. </span><span class="uparrow" onclick="increase(this.id)" id='+i+'>&#9650</span><span class="news"><a href="'+url[i]+'"> '+title[i]+'</a> </span> <span class="news_details">('+extractRootDomain(url[i])+')<br></span>'
     //    var v="vote["+i.toString()+"]"
     //    html+= '<span class="news_details pad">'+localStorage.getItem(v)+' votes<span onclick="comments(this.id)" id='+i+'> <a href="comment.html">'+elsp+' </a></span> | <span onclick="comments(this.id)" id='+i+'> <a href="comment.html">'+comment_count +' comments</a> <span  class="yes " id="flag-'+i.toString()+'" onclick="flag('+i+')"> | Flag</span> <span id="unflag-'+i.toString()+'" class=" no" onclick="flag('+i+')"> | UnFlag</span></span>'
     //    html+='</div>'
     //   }
     //   if(document.getElementById('log')){
     //     document.getElementById('log').innerHTML += html;
     //   }



     //Code with sorting the elements according to the number of votes
     //Starts here
     var v = "vote[" + i.toString() + "]"
     html[i] = '<div class="news_list"><span class="uparrow" onclick="increase(this.id)" id=' + i + '>&#9650</span><span class="news"><a href="' + url[i] + '"> ' + title[i] + '</a> </span> <span class="news_details">(' + extractRootDomain(url[i]) + ')<br></span><span class="news_details pad">' + localStorage.getItem(v) + ' votes<span onclick="comments(this.id)" id=' + i + '> <a href="comment.html">' + elsp + ' </a></span> | <span onclick="comments(this.id)" id=' + i + '> <a href="comment.html">' + comment_count + ' comments</a> <span  class="yes " id="flag-' + i.toString() + '" onclick="flag(' + i + ')"> | Flag</span> <span id="unflag-' + i.toString() + '" class=" no" onclick="flag(' + i + ')"> | UnFlag</span></span></div>'

 }
 for (i = 0; i < n; i++) {
     var v = "vote[" + i.toString() + "]"
     console.log(v);
     //   console.log(parseInt(localStorage.getItem(v)))
     for (j = 0; j < n; j++) {
         var t = "vote[" + j.toString() + "]";
         //   console.log(t);
         if (parseInt(localStorage.getItem(v)) < parseInt(localStorage.getItem(t))) {
             v = t;
             var z = html[i];
             html[i] = html[j];
             html[j] = z;
         }
     }
 }

 //Remove for loop to remove the sort by vote
 for (i = 0; i < n; i++) {
     if (document.getElementById('log')) {
         document.getElementById('log').innerHTML += '<span class="numbering">' + (i + 1) + '. </span>' + html[i] + '<br>';
     }
 }
 //Ends here


 for (i = 0; i < n; i++) {
     var z = "unflag-" + i.toString();
     var yold = "flag-" + i.toString();
     var flgvalue = "flg[" + i.toString() + "]";
     var x = document.getElementById(z);
     var y = document.getElementById(yold);
     if (localStorage.getItem(flgvalue) == "0") {
         if (y) {
             y.className += " " + "inline";
             x.className += " " + "none";
         }
     } else {
         if (y) {
             y.className += " " + "none";
             x.className += " " + "inline";
         }
     }

 }
 }
 function flag(x) {
     var z = "unflag-" + x.toString();
     var yold = "flag-" + x.toString();
     var flgvalue = "flg[" + x.toString() + "]";
     var x = document.getElementById(z);
     var y = document.getElementById(yold);
     if (localStorage.getItem(flgvalue) == "1") {
         y.style.display = "inline";
         x.style.display = "none"
         localStorage.setItem(flgvalue, 0);
         location.reload();
     } else {
         y.style.display = "none";
         x.style.display = "inline"
         localStorage.setItem(flgvalue, 1);
         location.reload();
     }
 }

 function increase(x) {
     var votes = "vote[" + x.toString() + "]"
     var vote_ct = parseInt(localStorage.getItem(votes));
     localStorage.setItem(votes, ++vote_ct);
     console.log(localStorage);
     location.reload();
     // localStorage.votes=z
 }

 function comments(x) {
     localStorage.setItem('id', x)
 }

 function extractHostname(url) {
     var hname;
     //find & remove protocol (http, ftp, etc.) and get hostname

     if (url.indexOf("//") > -1) {
         hname = url.split('/')[2];
     } else {
         hname = url.split('/')[0];
     }

     //find & remove port number
     hname = hname.split(':')[0];
     //find & remove "?"
     hname = hname.split('?')[0];

     return hname;
 }

 function extractRootDomain(url) {
     var domain = extractHostname(url),
         Arr = domain.split('.'),
         arrLen = Arr.length;

     //extracting the root domain here
     //if there is a subdomain 
     if (arrLen > 2) {
         domain = Arr[arrLen - 2] + '.' + Arr[arrLen - 1];
         //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
         if (Arr[arrLen - 2].length == 2 && Arr[arrLen - 1].length == 2) {
             //this is using a ccTLD
             domain = Arr[arrLen - 3] + '.' + domain;
         }
     }
     return domain;
 }


 //Function to calculate time differnce between current time and the time it was posted
 function timeDifference(current, previous) {

     var ms_in_Minute = 60 * 1000;
     var ms_in_Hour = ms_in_Minute * 60;
     var ms_in_Day = ms_in_Hour * 24;
     var ms_in_Month = ms_in_Day * 30;
     var ms_in_Year = ms_in_Day * 365;
     var elapsed = previous - current;

     if (elapsed < ms_in_Minute) {
         return Math.round(elapsed / 1000) + ' seconds ago';
     } else if (elapsed < ms_in_Hour) {
         return Math.round(elapsed / ms_in_Minute) + ' minutes ago';
     } else if (elapsed < ms_in_Day) {
         return Math.round(elapsed / ms_in_Hour) + ' hours ago';
     } else if (elapsed < ms_in_Month) {
         return Math.round(elapsed / ms_in_Day) + ' days ago';
     } else if (elapsed < ms_in_Year) {
         return Math.round(elapsed / ms_in_Month) + ' months ago';
     } else {
         return Math.round(elapsed / ms_in_Year) + ' years ago';
     }
 }