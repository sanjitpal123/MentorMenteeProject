import {
  CancelledSessionRepo,
  CreateSessionRepo,
  GetAllSessionRepo,
  GetASessionByIdRepo,
  RescheduleRepo,
  UpdateSessionByIdRepo,
} from "../Repository/sessionRepo.js";

export const CreateSessionService = async (data) => {
  try {
    const session = await CreateSessionRepo(data);
    return session;
  } catch (error) {
    throw error;
  }
};

export const GetASessionByid = async (id) => {
  try {
    const session = await GetASessionByIdRepo(id);
    return session;
  } catch (error) {
    throw error;
  }
};
export const RescheduleService = async (id, date) => {
  try {
    const updated = await RescheduleRepo(id, date);
    return updated;
  } catch (error) {
    throw error;
  }
};
export const CancelledSessionService = async (id) => {
  try {
    const deleted = await CancelledSessionRepo(id);
    return deleted;
  } catch (error) {
    throw error;
  }
};

export const UpdateSessionByIdService = async (id, status) => {
  try {
    const updated = await UpdateSessionByIdRepo(id, status);
    return updated;
  } catch (error) {
    throw error;
  }
};

export const GetAllSessions = async (userid) => {
  try {
    const getall = await GetAllSessionRepo(userid);
    return getall;
  } catch (error) {
    cons;
  }
};
