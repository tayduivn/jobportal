const mongoose = require('mongoose');
const mongodb = require('mongodb');


const CandidateProfile 		= require('./ModelCandidateProfile.js');

exports.insertCandidateBasicInfo = (req, res, next)=>{

	const candidateData = new CandidateProfile({
		"_id" : new mongoose.Types.ObjectId(),
		"basicInfo" : {
			"firstName"			: req.body.firstName,
			"middleName"		: null,
			"lastName" 		 	: req.body.lastName,
			"dob" 			 	: null,
			"age" 			 	: null,
			"gender"	 	 	: null,
			"maritalStatus"  	: null,
			"anniversaryDate"	: null,
			"languagesKnown" 	: [],
			"nationality" 	 	: null,
		},
		"panCard" 		 		: null,
		"aadhaarCard" 	 		: null,
		"contact" : {
			"mobile" 		 	: req.body.mobile,
			"emailId" 		 	: req.body.emailId,
		},
		"user_id"		 	 	: req.body.user_id,	
		"createdAt" : new Date(),
		"createdBy" : req.body.createdBy,
		"updateLog" : [
			{"updatedBy": req.body.user_id, "updatedAt":new Date(), "remark":req.body.remark }
		]
		});
	

	candidateData.save()
			.then(data => {
			res.status(200).json({							
				message	: "Candidate details inserted successfully",
			});
		})
		.catch(error=>{
			console.log(error);
			res.status(500).json({
				error 	: error,
				message : "Failed to insert candidate details."
			});
		});		
}
exports.getSingleCandidate = (req,res,next)=>{
    CandidateProfile.findOne({_id : req.params.candidateID})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.updateCandidateBasicInfo = (req, res, next)=>{
	const candidateData = new CandidateProfile({
			"_id" : new mongoose.Types.ObjectId(),
			"basicInfo" : {
				"firstName"		 : req.body.firstName,
				"middleName" 	 : req.body.middleName,	
				"lastName" 		 : req.body.lastName,
				"dob" 			 : new Date(req.body.dob),
				"age" 			 : req.body.dob,
				"gender"	 	 : req.body.gender,
				"maritalStatus"  : req.body.maritalStatus,
				"anniversaryDate": new Date(req.body.anniversaryDate),
				"languagesKnown" : req.body.languagesKnown,
				"nationality" 	 : req.body.nationality,
				"panCard" 		 : req.body.panCard,
				"aadhaarCard" 	 : req.body.aadhaarCard,
			},
			
			// "skillCertification": {
			// 	"skill" 		: req.body.skill,
			// 	"rating"   		: req.body.rating,
			// 	"skilldesc"   	: req.body.skilldesc,
			// 	"certName"		: req.body.certName,
			// 	"issuedBy"   	: req.body.issuedBy,
			// 	"certifiedOn" 	: new Date(req.body.certifiedOn),
			// 	"validTill"		: new Date(req.body.validTill),
			// 	"gradePercent"	: req.body.gradePercent,
			// },
			
			// "createdAt" : new Date(),
			// "createdBy" : req.body.user_id,
			"updateLog" : [
				{"updatedBy": req.body.user_id, "updatedAt":new Date(), "remark":req.body.remark }
			]
			});
		

		candidateData.save()
				.then(data => {
				res.status(200).json({							
					message	: "Candidate details Inserted Successfully",
				});
			})
			.catch(error=>{
				console.log(error);
				res.status(500).json({
					error 	: error,
					message : "Some issue occurred during Insert Candidate details."
				});
			});
		
}

exports.addCandidateAddress = (req,res,next)=>{
    console.log(req.body)
    CandidateProfile.updateOne(
            { _id: ObjectID(req.body.candidateID) },  
            {
                $push:  { 'address' : req.body.address }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ created : true });
            }else{
                res.status(401).json({ created : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });    
};

exports.getOneCandidateAddress = (req,res,next)=>{
    CandidateProfile.find({"_id" : req.body.candidateID, "address._id":req.body.addressID },
        {"address.$" : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.updateOneCandidateAddress = (req,res,next)=>{
    var address = req.body.address;
    
    CandidateProfile.updateOne(
            { "_id":req.body.candidateID, "address._id": req.body.addressID},  
            {
                $set:   { 	'address.$.addressType'    	: address.addressType,
							'address.$.houseNumber' 	: address.houseNumber,
							'address.$.address' 		: address.address,
							'address.$.area' 		 	: address.area,
							'address.$.cityVillage' 	: address.cityVillage,
							'address.$.district' 		: address.district,
							'address.$.state' 		 	: address.state,
							'address.$.country' 		: address.country,
							'address.$.pincode' 		: address.pincode,
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ updated : true });
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.updateCandidateContact = (req,res,next)=>{
   CandidateProfile.updateOne(
            { "_id":req.body.candidateID },  
            {
                $set:   { 		"mobile" 		 : req.body.mobile,
							 	"altMobile"   	 : req.body.altMobile
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ updated : true });
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.addCandidateAcademics = (req,res,next)=>{
    console.log(req.body)
    CandidateProfile.updateOne(
            { _id: ObjectID(req.body.candidateID) },  
            {
                $push:  { 'academics' : req.body.academics }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ created : true });
            }else{
                res.status(401).json({ created : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });    
};

exports.getOneCandidateAcademics = (req,res,next)=>{
    CandidateProfile.find({"_id" : req.body.candidateID, "academics._id":req.body.academicsID },
        {"academics.$" : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};


exports.updateOneCandidateAcademics = (req,res,next)=>{
    var academics = req.body.academics;
    
    CandidateProfile.updateOne(
            { "_id":req.body.candidateID, "academics._id": req.body.academicsID},  
            {
                $set:   { 	"academics.$.qualificationLevel" : academics.qualificationLevel,
						 	"academics.$.qualification"	     : academics.qualification,
						 	"academics.$.specialization" 	 : academics.specialization,
						 	"academics.$.grade" 		 	 : academics.grade,
						 	"academics.$.mode"			 	 : academics.mode,
						 	"academics.$.passOutYear" 	 	 : academics.passOutYear,
						 	"academics.$.collegeSchool"  	 : academics.collegeSchool,
						 	"academics.$.universityBoard"	 : academics.universityBoard,
						 	"academics.$.state"			 	 : academics.state,
						 	"academics.$.country"		 	 : academics.country,
						 	"academics.$.cityVillage" 	 	 : academics.cityVillage,
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ updated : true });
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};


exports.addCandidateExperience = (req,res,next)=>{
    CandidateProfile.updateOne(
            { _id: ObjectID(req.body.candidateID) },  
            {
                $push:  { 'workExperience' : req.body.experience }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ created : true });
            }else{
                res.status(401).json({ created : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });   
};

exports.getOneCandidateExperience = (req,res,next)=>{
    CandidateProfile.find({"_id" : req.body.candidateID, "workExperience._id":req.body.workExperienceID },
        {"workExperience.$" : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};


exports.updateOneCandidateExperience = (req,res,next)=>{
    var experience = req.body.experience;
    
    CandidateProfile.updateOne(
            { "_id":req.body.candidateID, "academics._id": req.body.experienceID},  
            {
                $set:   { 	"workExperience.$.companyName" 			: experience.companyName,
						 	"workExperience.$.country"	     		: experience.country,
						 	"workExperience.$.city" 	 			: experience.city,
						 	"workExperience.$.lastDegn" 		 	: experience.lastDegn,
						 	"workExperience.$.department"			: experience.department,
						 	"workExperience.$.lastSalary" 	 		: experience.lastSalary,
						 	"workExperience.$.fromDate"  	 		: experience.fromDate,
						 	"workExperience.$.toDate"	 			: experience.toDate,
						 	"workExperience.$.responsibilities"		: experience.responsibilities,
						 	"workExperience.$.reportingManager"		: experience.reportingManager,
						 	"workExperience.$.reportingManagerDegn" : experience.reportingManagerDegn,
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ updated : true });
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};