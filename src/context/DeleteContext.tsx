import React, { createContext, useContext } from "react";

const DeleteContext = createContext<{ DeletePost: (id: string) => void }>({
  DeletePost: () => {},
});
DeleteContext.displayName = "Delete Context";

interface Props {
  value: { DeletePost: (id: string) => void };
  children: React.ReactElement;
}
export function DeleteContextProvider({ value, children }: Props) {
  return (
    <DeleteContext.Provider value={value}>{children}</DeleteContext.Provider>
  );
}

export const useDeleteContext = () => useContext(DeleteContext);
