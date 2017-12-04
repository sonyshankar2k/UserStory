export class TransactionalBase {
    public returnStatus: Boolean;
    public returnMessage: string[];
    public validationErrors: any[];
    public totalPages: number;
    public totalRows: number;
    public pageSize: number;
    public isAuthenticated: Boolean;
    public sortExpression: string;
    public sortDirection: string;
    public currentPageNumber: number;
    public token: string;
}
