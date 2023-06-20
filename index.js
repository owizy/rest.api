const express = module.require('express');
const mongoose = module.require('mongoose');
const Student = module.require('./model')

console.log(Student)

const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
     console.log("app is now listening for request on //http:localhost:"+ PORT)
})

// connecting to db
mongoose.connect('mongodb+srv://codeprof:GodBlessCodeprof@cluster0.2njl1ct.mongodb.net/').then(()=>{
       console.log("successfully connected to db")
}).catch((err)=>{
    console.log("Ooops! failed to connect to db due to " + err)
})

// midlle wares
app.use(express.json())

// handling requests

// get
app.get('/allstudents', async(req,res)=>{

    try{
          
          const allStudents = await Student.find()
          res.send(
                 allStudents
                 
        )
        console.log(allStudents)

    }catch(err){
          res.send('Ooops! error occured. Could not fetch all students from the db due to ' + err)

    }

})


// get a specific student

app.get('/:student_id', async(req, res)=>{
      
     try{
          
          const oneStudent = await Student.findById(req.params.student_id)
          res.send(
                 oneStudent
                 
        )
     
    }catch(err){
          res.send('Ooops! error occured. Could not fetch all students from the db due to ' + err)

    }
       
})


// post

      app.post('/poststudent', async(req, res)=>{
                let new_student = Student({
                       firstname: req.body.firstname,
                       lastname: req.body.lastname,
                       email:req.body.email,
                       phone:req.body.phone,
                       course:req.body.course,
                       status:req.body.status
                })
           try{

                 let posted_student = await new_student.save()

                 res.send(posted_student)
                    
           }catch(err){
               res.send("Ooops! error, could not post student due to " + err)
           }
      })
//put or patch

 app.patch('/:student_id', async(req, res)=>{
        try{

           let updatedStudent = await Student.findByIdAndUpdate({
                _id:req.params.student_id
            }, req.body)

            res.send(updatedStudent)

        }catch(err){
              res.json({
                  message:"Ooops! failed to updated!",
                  err:err.message,
                  updatedStudent:updatedStudent
              })
        }
 })

//delete
app.delete('/:student_id', async(req, res)=>{
        
       try{

             let deleted_student =  await Student.findByIdAndDelete({
                _id:req.params.student_id
             })

           res.json({
            message:"student deleted successfully ",
            deleted_student:deleted_student,

        })
       }catch(err){

           res.send("Ooops!! error occured due to " + err)
       }
})


