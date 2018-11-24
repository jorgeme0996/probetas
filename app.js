var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Contacto        = require("./models/contacto"),
    Beca            = require("./models/becas"),
    nodemailer      = require("nodemailer");

//mongoose.connect("mongodb://localhost/Descubramos", {useNewUrlParser: true});    
mongoose.connect("mongodb://jorge:jorge007@ds141960.mlab.com:41960/descubramos", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/nosotros", function(req, res){
    res.render("nosotros/nosotros.ejs");
});

app.get("/beca", function(req, res){
    res.render("becas/beca.ejs");
});

app.get("/programa", function(req, res){
    res.render("programa/programa.ejs");
});

app.post("/beca", function(req, res){
    var newBeca = req.body.beca;
    Beca.create(newBeca, function(err, newlyBeca){
        if(err){
            console.log(err)
        } else {
            const output = `
            <p> Tienes una solicitud de beca </p>
            <h3> Detalles del solicitante:  ${newBeca.name}</h3>
            <ul>
                <li>Nombre: ${newBeca.name}</li>
                <li>Apellido: ${newBeca.lastName}</li>
                <li>Email: ${newBeca.email}</li>
                <li>Telefono de contacto: ${newBeca.celular}</li>
                <li>¿Contactar por whats?: ${newBeca.whats}</li>
                <li>¿Porque debemos darte la beca?: ${newBeca.porque}</li>
            </ul>
            `;

            let transporter = nodemailer.createTransport({
                host: 'mail.privateemail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'admin@descubramos.mx', // generated ethereal user
                    pass: 'J0rg3m30996' // generated ethereal password
                },
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Descubramos Juntos" <admin@descubramos.mx>', // sender address
                to: 'jorgeme0996@gmail.com', // list of receivers
                subject: 'Solicitud de beca Descubramos!!!!!!', // Subject line
                text: 'Prueba', // plain text body
                html: output // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            });

            res.render("beca/correcto.ejs")
        }
    });

});

app.post("/contacto", function(req, res){
    var newContacto = req.body.contacto;
    Contacto.create(newContacto, function(err, newlyContacto){
        if(err){
            console.log(err)
        } else {
            const output = `
            <p> Tienes que contactar a alguien </p>
            <h3> Detalles del contacto:  ${newContacto.name}</h3>
            <ul>
                <li>Nombre: ${newContacto.name}</li>
                <li>Apellido: ${newContacto.lastName}</li>
                <li>Email: ${newContacto.email}</li>
                <li>Telefono de contacto: ${newContacto.celular}</li>
            </ul>
            `;

            let transporter = nodemailer.createTransport({
                host: 'mail.privateemail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'admin@descubramos.mx', // generated ethereal user
                    pass: 'J0rg3m30996' // generated ethereal password
                },
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Descubramos Juntos" <admin@descubramos.mx>', // sender address
                to: 'jorgeme0996@gmail.com', // list of receivers
                subject: 'Descubramos!!!!!!', // Subject line
                text: 'Prueba', // plain text body
                html: output // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            });

            res.render("programa/correcto.ejs")
        }
    });

});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Esta vivo!!!!")
})
//process.env.PORT,process.env.IP