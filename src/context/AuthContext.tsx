import React, { createContext, useContext, useEffect, useState } from "react";

import type { AuthData } from "../types/AuthData";
import { GetProfile } from "../services/Auth";
import type { ProfileData } from "../types/ProfileData";

const AuthContext = createContext<AuthData>({
  user: null,
  loading: true,
  setRefresh: null,
});
AuthContext.displayName = "Authenticate Context";

interface Props {
  children: React.ReactElement;
}
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    setLoading(true);
    GetProfile()
      .then(({ data }: { data: ProfileData }) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  return (
    <AuthContext
      value={{
        user,
        loading,
        setRefresh,
      }}
    >
      {children}
    </AuthContext>
  );
}

export const useAuthContext = () => useContext(AuthContext);
