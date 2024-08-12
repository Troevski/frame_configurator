export const useCheckContext = (context: any) => {
  if (!context) {
    throw new Error("Modal must be used within an AppContext.Provider");
  }
  return context;
};
