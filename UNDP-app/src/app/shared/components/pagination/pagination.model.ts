export class PaginationModel {
    public currentPage: number|undefined = 1;
    public lastPage: number | undefined;
    public recordPerPage: number = 30;
    public recordPerPageName: string |undefined= '30';
    public total: number | undefined;
    public list: any |undefined = [];
    public from: number |undefined= 1;
    public to: number |undefined = 1;
}
