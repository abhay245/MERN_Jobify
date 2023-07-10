const mongoose=require('mongoose')
const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please provide company name'],
        maxlength:50,
    },
    position:{
        type:String,
        required:[true,'Please provide position'],
        maxlength:100,
    },
    status:{
        type:String,
        enum:['Interview','Declined','Pending'],
        default:'pending',
    },
    jobType:{
        type:String,
        enum:['Full-time','Part-time','Remote','Intership'],
        default:'full-time',
    },
    jobLocation:{
        type:String,
        default:'my city',
        required:true,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Plese provide use'],
    },
},
{timestamps:true}
)
const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
