export interface MyStore {
  message: {
    offline: boolean;
  };
  auth: {
    isLoading: boolean;
    res: object | null;
    err: object | null;
    fromPage: string | null;
    isLogged: boolean;
  };
  categoryState: {
    isLoading: boolean;
    edit: boolean;
    newItem: object;
    item: object;
    err: object | null;
    items: object[];
  };
}
