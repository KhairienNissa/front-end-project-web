const express = require("express");

const app = express();
const port = 5000;

app.set('view engine', 'hbs')

app.use('/public', express.static(__dirname + '/public'))

app.use(express.urlencoded({extended: false}))


app.get("/", function (req, res) {
  res.send("Hello caca!");
});

  
app.get("/my-contact", function (req, res) {
    res.render('contact');
  });


let blogs = [
  {
    projectname : 'Dumbway Mobile App - 2021',
    deskripsi : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit Praesentium illo delectus fuga provident Lorem ipsum dolor sit amet.',
    duration : '3 bulan',
    nodeJs : 'fa-brands fa-node-js',
    reactJs : "fa-brands fa-react",
    nextJs : "fa-brands fa-python",
    javascript : "fa-brands fa-js"
   
  }
]

app.get("/home", function (req, res) {
    res.render('home', {blogs});
  });

app.get("/add-project", function (req, res) {
  console.log(blogs)

    res.render('myproject');
  });



app.post("/add-project", function (req, res) {
    console.log(req.body);

    let data = req.body
  
    data ={
      projectname : data.projectname.slice(0, 25) + '..',
      deskripsi : data.deskripsi.slice(0, 100) + '..',
      duration : durationblog(data.startdate, data.enddate),
      startdate : data.startdate,
      enddate : data.enddate,
      nodeJs : data.nodeJs,
      reactJs : data.reactJs,
      nextJs : data.nextJs,
      javascript : data.javascript
    }
    console.log(data);
    blogs.push(data)

    res.redirect('/home')
  });


  app.get('/detail-project/:index', function(req, res){
    console.log(req.params);

    let index = req.params.index

    let blog = blogs[index]

    res.render('detailproject', blog)
  }) 

  app.get('/delete-project/:index', function(req, res){

    console.log(req.params.index)

    let index = req.params.index

    blogs.splice(index, 1)

    res.redirect('/home')
  })


 app.get('/edit-project/:index', function(req, res){
  let index = req.params.index
  let blog = blogs[index]
  
  let nodeJs = blog.nodeJs
  let reactJs = blog.reactJs
  let nextJs = blog.nextJs
  let javascript = blog.javascript
  let startdate = blog.startdate
  let enddate = blog.enddate
  
  console.log(blogs);
  if(nodeJs != null){
    nodeJs = true
  } else{
    nodeJs = false
  }
  if(reactJs != null){
    reactJs = true
  } else{
    reactJs = false
  }
  if(nextJs != null){
    nextJs = true
  } else{
    nextJs = false
  }
  if(javascript != null){
    javascript = true
  } else{
    javascript = false
  }

  console.log(enddate);
  res.render('editproject', {update: blogs[index], index, nodeJs, reactJs, nextJs, javascript, startdate, enddate})
 })


app.post('/edit-project/:index', function(req, res){
  let index = req.params.index
  let data = req.body
 
    blogs[index].projectname = data.projectname
    blogs[index].deskripsi = data.deskripsi
    blogs[index].startdate = data.startdate
    blogs[index].enddate = data.enddate
    blogs[index].nodeJs = data.nodeJs
    blogs[index].reactJs = data.reactJs
    blogs[index].nextJs = data.nextJs
    blogs[index].javascript = data.javascript
    blogs[index].duration = durationblog(data.startdate, data.enddate)
  

  res.redirect('/home')
})


  function durationblog (stdate, endate) {
    let start = new Date(stdate);
    let end = new Date(endate);
  
    let duration = end.getTime() - start.getTime();
  
      let miliseconds = 1000 // 1000 miliseconds dalam 1 detik
      let secondInHours = 3600 // 1 jam sama dengan 3600 detik
      let hoursInDay = 24 // 24 jam dalam 1 hari
      let daysInMonth = 30
      let monthsInYears = 12
  
      let year = Math.floor(duration/ (miliseconds * secondInHours * hoursInDay * daysInMonth *monthsInYears))
      let month = Math.floor (duration/ (miliseconds * secondInHours * hoursInDay* daysInMonth))
      let day = duration / (miliseconds * secondInHours * hoursInDay)
     
  
      if (day < 30) {
        return day + 'hari';
      } else if (month < 12) {
        return month + 'bulan';
      } else {
        return year + 'tahun';
      }
  
    }






















app.get("/my-contact", function (req, res) {
    res.render('contact');
  });

  app.get("/detail-project", function (req, res) {
    res.render('detailproject');
  });






app.listen(port, function () {
  console.log(`Listening server on port ${port}`);
});
