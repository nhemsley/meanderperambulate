resume = {
  name: "Nicholas Hemsley",
  address: "128 Wray Ave, WA, 6160",
  email: "nick.hems@gmail.com",
  mobile: "<img src='/images/mob.png' />",
  dob: "June 09, 1980",
  education:
  [{institution: "Completed Secondary Education – Year 12", description: "Busselton Senior High School, 1997"},
  {institution: "Edith Curtin University	2001 - 2005", description: "Bachelor's degree in Computer Science."}],
  experience:
  [{disable: true,
    business:"Deli 333",
    dates: "November 2009 - Current",
    description: "I currently work part time at Deli 333. My duties include preparing coffees, customer service and food preparation. I have been working at Deli 333 on a casual basis since returning to Perth."},
  {business:"Media on Mars",
   dates: "2003 - Current",
   description: "I have been working on a casual basis for Media on Mars as a freelance programmer for over 5 years. My duties include building dynamic websites (PHP, wordpress, & standalone), providing support for the designers with various aspects of html & css. I also provide IT support both in-house and remotely. This involved installation of Windows Small Business Server. Management of security aspects of the network, and enabling shared network access to design files. Configuration of Exchange Server, which allows the staff shared access to mail inboxes, calendar and business contacts. "},
/*  {business:"Bunnings Australia, Darwin Airport",
   dates: "September 2009 – November 2009",
   description: "Store relay / stocktake. I was working at Bunnings in Darwin on the store wide stock reorganization. My duties included stock take, customer service and night fill. I was working through an employment agency."},*/
  {business:"Sunflower Hostel, Berlin",
   dates: "July 2008 – January 2009",
   description: "I travelled in Europe for eight months, four of which were spent in Berlin. Whilst I still had an international contract with Phone Control, I worked in Berlin at the Sunflower Hostel doing afternoon & night shifts. My duties included check-in & check-out of guests, and serving guests drinks from behind the bar."},
  {business:"Phone Control Australia.	",
   dates: "January 2005 - June 2009",
   description: "At PhoneControl, I was primarily tasked with creating a web based reporting system to complement PhoneControl's in house windows based reporting software. Due to system constraints (windows install only), I implemented this as a .NET solution, based upon Castle Monorail. This was a MVC system on the back end, with extensive use of javascript to provide a rich and interactive experience (javascript based graphs, ajax etc)."},
  {disable: true, business:"Bebida Bar & Cafe",
   dates: "September 2006 – February 2007",
   description: "For 6 months I took time off from Phone Control, and was living in Melbourne. At this time I was working at Bebida behind the bar, and as a waiter. My duties included preparing and serving drinks, waiting on tables, and general duties in the kitchen."},
  {business:"Itomic Pty Ltd",
   dates: "January 2005 – December 2005",
   description: "I was primarily a web developer for Itomic. This involved PHP, HTML, a small about of javascript (this was pre-prototype & jquery) and MySQL. My other duties uncluded: network administration, linux administration (administering the cPanel based web servers when needed), client support, email problems, web-site related problems, customer service."},
  {business:"Chrysalis Montessori",
   dates: "November 2004 – November 2006 ",
   description: "Computer and Network Maintenance for a network of 20+ school computers. Liaising with staff, students & parents with regards to the IT matters of the school."},
  { business:"Itomic Pty Ltd",
    dates: "July 2002 – September 2003",
    description: "(See above)"},
  { disable: true,
    business:"Aristos Restaurant, Crawley",
    dates: "December 2001 – June 2002",
    description: "At Aristos, I was a waiter and valet driver. Experience in customer service, waiting and general duties in the restaurant."},
  { disable: true,
    business:"Dominoes Pizza, Morley",
   dates: "June 2001 – November 2001",
   description: "I was a pizza delivery driver for 6 months at the Morley store for Dominoes Pizza. I also performed general duties around the store. Also serving customers, taking orders & operating the POS system."}
   ],
   references:
   [ {name: "Kammi Rapsey", title:"Principal", telephone:"(08) 9433 3394", email:"kammi@mediaonmars.com.au"},
     {name: "Ross Gerring", title: "Manager", telephone:"(08) 9321 3844", email: "ross@itomic.com.au"} ],
   goals:
   [
    "<p><span class='title'>Goals:</span> To build cutting edge websites and software utilising state of the art web technologies.</p>",
    "<p><span class='title'>Current <a href='/projects.html'>interests</a>:</span> Nodejs, Rails, the Cloud, Guitar</p>"
   ]
}

resume.setup = function()
{
  var cont = $.zc("div#resume");
  var content = app.dom().content();
  content.append(cont);
  cont.append("<div class='details section'></div>");
  var container = cont.children().last();
  container.append("<h1>"+resume.name+"</h1>");
  function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1);}
  _.each(["address", "email", "mobile", "dob"], 
    function(field) {container.append("<div class='detail'><span class='label'>"+capitalize(field)+"</span><span class='detail'>"+resume[field]+"</span></div>");});
  
  cont.append("<div class= 'education section'></div>");
  container = cont.children().last();
  container.append("<h1>Education</h1>");
  _.each(resume.education,
    function(education){container.append("<div class='institution'><h2>" + education.institution + "</h2><p class='description'>"+education.description+"</p></div>");});

  cont.append("<div class='experiencep section'></div>");
  container = cont.children().last();
  container.append("<h1>Work Experience</h1>");
  _.each(resume.experience,
  function(experience){ if (!experience.disable) { container.append("<div class='experience'><span class='business'>"+experience.business+"</span><span class='dates'>"+experience.dates+"</span></div><p class='description'>"+experience.description+"</p>");}});
  
  cont.append("<div class='references section'></div>");
  container = cont.children().last();
  container.append("<h1>References</h1>");
  _.each(resume.references, function (reference) {
    container.append("<div class='reference'><p class='reference'>" + reference.name + ", " + reference.title + "</p><p class='referencedetails'><strong>tel:</strong> " + reference.telephone + "<br /> <strong>email:</strong> " + reference.email + "</p></div>");
  });
  
  var goals = $.zen("div#goals.box");
  content.append(goals);
  _(resume.goals).each(function (goal) {
    goals.append($(goal));
  });
}

resume.setup();
