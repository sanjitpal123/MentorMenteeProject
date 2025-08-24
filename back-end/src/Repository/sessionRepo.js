import Session from "../Model/SessionBookingModel.js";

export const CreateSessionRepo = async (data) => {
  try {
    const res = await Session.create(data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetASessionByIdRepo=async(id)=>{
  try{
    const session=await Session.findById(id);
    return session;

  }catch(error)
  {
    throw error;
  }
}

export const RescheduleRepo = async (id, date) => {
  try {
    const updated = await Session.findByIdAndUpdate(
      id,
      { date: date },  // wrap in object
      { new: true }
    );
    return updated;
  } catch (error) {
    throw error;
  }
};
export const CancelledSessionRepo=async(id)=>
{
  try{
    const datedone=await Session.findByIdAndDelete(id);
    return datedone;

  }catch(error)
  {
    throw error;
  }

}
