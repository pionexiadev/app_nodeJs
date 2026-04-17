const express = require("express");
// recuperer le package mysql
const mysql = require("mysql2");


const app = express();

app.use(express.json());
// etanlir la chaine de connexion
const cn = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "monprojet"
});


// tester la conexion

cn.connect((err) => {
   if (err) {
      console.log("Erreur de connexion", err)
   } else {
      console.log("connexion avec succes");
   }


})




app.get("/", (req, res) => {
   cn.query("Select * from etudiant", (err, result) => {
      if(err){
         res.send("Erreur de recuperatin");
      }

      res.json(result);
   })
})


// ajouter un etudiant 
app.post("/etudiants", (req, res)=>{
   const {nom, age} = req.body;
   cn.query("insert into etudiant (nom, age) values (?,?)", 
      [nom,age], (err) =>{
         if(err){
            res.send("Erreur d'ajout", err);
            return;
         }

         res.send("Etudiant ajouté");
      }

   )
})


app.put("/etudiants/:id",(req, res)=>{
   const id= req.params.id;
   const {nom, age} =req.body;

   cn.query("update etudiant set nom=? , age=? where id=?",[nom, age, id],
      (err) =>{
         if(err){
            res.send("modification echec", err);
            return;
         }

         res.send("etudiant modifié");
      }
   )

});

app.delete("/etudiants/:id", (req, res)=>{
   const id= req.params.id;
   cn.query("Delete from etudiant where id=?",
      [id], 
      (err)=>{
         if(err){
            res.send("erreur", err);
            return;
         }

         res.send("etudiant supprimé");
      }
   )
})
app.listen(3000, () => {
   console.log("Serveur démarré sur http://localhost:3000");
})