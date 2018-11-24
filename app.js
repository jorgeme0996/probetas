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
            const output = `
            <p> Tienes que contactar a alguien </p>
            <h3> Detalles del contacto </h3>
            <ul>
                <li>Nombre: ${newContacto.name}</li>
                <li>Apellido: ${newContacto.lastName}</li>
                <li>Email: ${newContacto.email}</li>
                <li>Telefono de contacto: ${newContacto.celular}</li>
            </ul>
            `;

            let transporter = nodemailer.createTransport({
                host: 'mail.privateemail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'admin@descubramos.mx', // generated ethereal user
                    pass: 'J0rg3m30996' // generated ethereal password
                },
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Nodemailer Contact" <admin@descubramos.mx>', // sender address
                to: 'jorgeme0996@gmail.com', // list of receivers
                subject: 'Requerimiento de Contacto', // Subject line
                text: 'Prueba', // plain text body
                html: output // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });

            res.render("programa/correcto.ejs")
        }
    });

});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("Esta vivo!!!!")
})
//process.env.PORT,process.env.IP