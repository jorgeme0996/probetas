var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Contacto        = require("./models/contacto"),
    nodemailer      = require("nodemailer");

mongoose.connect("mongodb://localhost/Descubramos", {useNewUrlParser: true});    
//mongoose.connect("mongodb://jorge:jorge007@ds141960.mlab.com:41960/descubramos", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/nosotros", function(req, res){
    res.render("nosotros/nosotros.ejs");
});

app.get("/programa", function(req, res){
    res.render("programa/programa.ejs");
});

app.post("/contacto", function(req, res){
    var newContacto = req.body.contacto;
    Contacto.create(newContacto, function(err, newlyContacto){
        if(err){
            console.log(err);
        } else {
            res.render("programa/correcto.ejs")
        }
    });

});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Esta vivo!!!!")
})
//process.env.PORT,process.env.IP