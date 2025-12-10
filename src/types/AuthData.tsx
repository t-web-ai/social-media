import type { Dispatch, SetStateAction } from "react";
import type { ProfileData } from "./ProfileData";

export interface AuthData {
  user: ProfileData | null;
  loading: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>> | null;
}
