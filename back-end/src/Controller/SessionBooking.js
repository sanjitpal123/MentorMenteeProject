import { CancelledSessionService, CreateSessionService, GetASessionByid, RescheduleService } from "../Services/Session.Service.js";

export const CreateSession = async (req, res) => {
  try {
    const { mentor, date, notes, status, topic, mentee } = req.body;
    if (!mentor || !date || !status || !topic || !notes) {
      return res.status(401).json({
        message: "please fill all the field",
        success: false,
      });
    }
    const session = await CreateSessionService({
      mentor,
      date,
      notes,
      status,
      topic,
      mentee,
    });
    if (!session) {
      return res.status(401).json({
        message: "Can not create session",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Session is created successfully",
      session,
    });
  } catch (error) {
    console.log('error',error)
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GetASession=async(req, res)=>{
  try{
    const id=req.params.id;
    const session=await GetASessionByid(id);
    if(!session)
    {
      return res.status(404).json({
        message:"Could not found session",
        success:false
      })
    }
    return res.status(201).json({
       session
    })

  }catch(error)
  {
    console.log('error',error);
    return res.status(501).json({
      message:"Internal server error",
      success:false
    })
  }
}

export const Reschedule=async(req, res)=>{
  try{
    const {date , id}=req.body;
    const exist=await GetASessionByid(id);
    if(!exist)
    {
      return res.status(404).json({
        message:"Can not get any session with this id ",
        success:false
      })
    }
    const reschedule=await RescheduleService(exist._id,date);
    if(!reschedule)
    {
      return res.status(403).json({
        message:"can not reschedule",
        success:false
      })
    }

    return res.status(201).json({
      message:"reschedule successfully",
      reschedule,
      success:true
    })

  }catch(error)
  {
    console.log("error",error)
    return res.status(501).json({
      message:"internal server error",
      successL:false
    })
  }
}

export const CancelledSessions=async(req, res)=>{
  try{
    const id=req.params.id;
    if(!id)
    {
      return res.status(401).json({
        message:"Empty id ",
        success:false
      })
    }
    const  deleted=await CancelledSessionService(id);
    if(!deleted){
      return res.status(403).json({
        message:"Can not cancelled session",
        success:false

      })
    }
    return res.status(201).json({
      message:"Session is successfully cancelled",
      deleted,
      success:true
    })

  }catch(error)
  {
    console.log('error',error);
    return res.status(501).json({
      message:"Internal server error",
      success:false
    })
  }
}