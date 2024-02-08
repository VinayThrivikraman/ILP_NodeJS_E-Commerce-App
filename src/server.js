const { where } = require('sequelize');
const sequelize = require('./config/sequelize-config')
const ec_suppliers = require('./models/ec_suppliers')
const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on PORT:",PORT);
});

sequelize.sync({ force: false })
    .then( () => {
        console.log("Database Synced");
    })
    .catch((error) => {
        console.error("Error Syncing Database:", error);
    })

app.post("/supplierRegistration", async (req, res) => {
    const {full_name, e_mail, password, profile_pic} = req.body;
    try {
        await ec_suppliers.create({full_name, e_mail, password, profile_pic});
        return res.status(200).send(`${full_name} has Successfully Registered`);
    }
    catch(error){
        console.log(error);
        return res.status(409).send(`Error: ${error}`);
    }
})

app.post("/login", async (req, res) => {
    const {e_mail, password, user_type} = req.body;

    if(user_type == "supplier"){
        try{
            console.log("\n\nREACHED LOGIN\n\n")

            const foundUser = await ec_suppliers.findOne({where:{e_mail, password}, raw:true});
            
            return res.status(200).send(`${foundUser.full_name} has Successfully Logged IN\nRegistration ID: ${foundUser.registration_id}`);
        }
        catch(error){
            return res.send(error);
        }
    }
    else {
        console.log("REACHED HERE");
        return res.status(401).send("INVALID USER TYPE");
    }

})

app.get("/profile", async (req,res) => {
    const {user_type, registration_id} = req.query;

    if(user_type == "supplier") {
        try {
            const foundUser = await ec_suppliers.findOne({where: {registration_id}, raw: true});
            return res.status(200).json(foundUser);
        }
        catch(error) {
            return res.status(422).send(error);
        }
        
    }
    else {
        console.log("REACHED HERE");
        return res.status(401).send("INVALID USER TYPE");
    }
})

app.patch("/forgotPassword", async (req,res) => {
    const {user_type, registration_id, new_password} = req.body;

    if(user_type == "supplier") {
        try {
            await ec_suppliers.update({password: new_password}, {where: {registration_id}});
            return res.status(200).send(`Password Changed`);
        }
        catch{
            return res.status(500).send(error);
        }      
    }
    else{
        return res.status(404).send("INVALID USER TYPE");
    }
})