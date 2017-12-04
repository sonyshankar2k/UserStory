import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation} from '@angular/core';
import { DataGridComponent} from '../shared/data-grid/data-grid.component';
import { DataGridColumn, DataGridEventInformation} from '../shared/data-grid/data-grid.core';
import { UserStory } from '../core/entities/userStory.entity';
import { UserStoryService } from '../core/services/userStory.service';
import { TransactionalBase } from '../core/entities/transactionalBase.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

@ViewChild(DataGridComponent) datagrid: DataGridComponent;

public userData = [];
public columns = [];

public totalRows: number;
public currentPageNumber = 1;
public totalPages: number;
public pageSize: number;
public Title: string;
private sortDirection: string;
private sortExpression: string;

public autoFilter: Boolean;
public delaySearch: Boolean;
public runningSearch: Boolean;

  constructor(private storyService: UserStoryService) {

  this.currentPageNumber = 1;
  this.autoFilter = false;
  this.totalPages = 0;
  this.totalRows = 0;
  this.pageSize = 5;
  this.sortDirection = 'ASC';
  this.sortExpression = 'id';
  }

  public ngOnInit() {
            this.columns.push(new DataGridColumn('id', 'ID', '[{"width": "5%" , "disableSorting": false}]'));
            this.columns.push(new DataGridColumn('userId', 'USER ID', '[{"width": "7%" , "disableSorting": false}]'));
            this.columns.push(new DataGridColumn('title', 'TITLE', '[{"width": "23%" , "disableSorting": false}]'));
            this.columns.push(new DataGridColumn('body', 'BODY', '[{"width": "70%" , "disableSorting": false}]'));
            this.executeSearch();
    }

    private executeSearch(): void {
        if (this.runningSearch === true) { return; }
                let miliseconds = 500;
                if (this.delaySearch === false) {
                    miliseconds = 0;
                }
                this.runningSearch = true;
                setTimeout(() => {
                    this.storyService.getAllUserData()
                        .subscribe(response => {
                                this.userData = response;
                                const transactionalInformation = new TransactionalBase();
                                // tslint:disable-next-line:radix
                                transactionalInformation.totalPages = parseInt((this.userData.length / this.pageSize).toString());
                                if ((this.userData.length % this.pageSize) > 0 ) {
                                    transactionalInformation.totalPages ++;
                                }
                                transactionalInformation.totalRows = this.userData.length;
                                // tslint:disable-next-line:max-line-length
                                if (this.sortExpression === 'id') {
                                    if (this.sortDirection === 'ASC' ) {
                                        this.userData.sort((obj1: any, obj2: any) => {
                                            if (obj1.id < obj2.id) {
                                                return -1;
                                            }
                                            if (obj1.id > obj2.id) {
                                                return 1;
                                            }
                                        });
                                    } else {
                                        this.userData.sort((obj1: any, obj2: any) => {
                                            if (obj1.id < obj2.id) {
                                                return 1;
                                            }
                                            if (obj1.id > obj2.id) {
                                                return -1;
                                            }
                                        });
                                    }
                                }

                                if (this.sortExpression === 'userId') {
                                    if (this.sortDirection === 'ASC' ) {
                                        this.userData.sort((obj1: any, obj2: any) => {
                                            if (obj1.userId < obj2.userId) {
                                                return -1;
                                            }
                                            if (obj1.userId > obj2.userId) {
                                                return 1;
                                            }
                                        });
                                    } else {
                                        this.userData.sort((obj1: any, obj2: any) => {
                                            if (obj1.userId < obj2.userId) {
                                                return 1;
                                            }
                                            if (obj1.userId > obj2.userId) {
                                                return -1;
                                            }
                                        });
                                    }
                                }

                                if (this.sortExpression === 'title') {
                                    if (this.sortDirection === 'ASC' ) {
                                        this.userData.sort((obj1: any, obj2: any) => {
                                            if (obj1.title < obj2.title) {
                                                return -1;
                                            }
                                            if (obj1.title > obj2.title) {
                                                return 1;
                                            }
                                        });
                                    } else {
                                        this.userData.sort((obj1: any, obj2: any) => {
                                            if (obj1.title < obj2.title) {
                                                return 1;
                                            }
                                            if (obj1.title > obj2.title) {
                                                return -1;
                                            }
                                        });
                                    }
                                }

                                if (this.sortExpression === 'body') {
                                    if (this.sortDirection === 'ASC' ) {
                                        this.userData.sort((obj1: any, obj2: any) => {
                                            if (obj1.body < obj2.body) {
                                                return -1;
                                            }
                                            if (obj1.body > obj2.body) {
                                                return 1;
                                            }
                                        });
                                    } else {
                                        this.userData.sort((obj1: any, obj2: any) => {
                                            if (obj1.body < obj2.body) {
                                                return 1;
                                            }
                                            if (obj1.body > obj2.body) {
                                                return -1;
                                            }
                                        });
                                    }
                                }

                                // tslint:disable-next-line:max-line-length
                                this.userData = this.userData.splice((this.currentPageNumber - 1) * this.pageSize, this.pageSize);
                                transactionalInformation.currentPageNumber = this.currentPageNumber;
                                transactionalInformation.pageSize = this.pageSize;
                                transactionalInformation.sortDirection = this.sortDirection;
                                transactionalInformation.sortExpression = this.sortExpression;
                                this.datagrid.databind(transactionalInformation);
                            });
                            this.runningSearch = false;
                }, miliseconds);

             }
    public datagridEvent(event) {
                const datagridEvent: DataGridEventInformation = event.value;
                if (datagridEvent.EventType === 'PagingEvent') {
                    this.pagingCustomers(datagridEvent.CurrentPageNumber);
                }else if (datagridEvent.EventType === 'PageSizeChanged') {
                    this.pageSizeChanged(datagridEvent.PageSize);
                }else if (datagridEvent.EventType === 'ItemSelected') {
                    this.selectedCustomer(datagridEvent.ItemSelected);
                }else if (datagridEvent.EventType === 'Sorting') {
                    this.sortCustomers(datagridEvent.SortDirection, datagridEvent.SortExpression);
                }
            }

            private selectedCustomer(itemSelected: number) {
                const rowSelected = itemSelected;
                const row = this.userData[rowSelected];
                const customerID = row.userId;
            }
            private sortCustomers(sortDirection: string, sortExpression: string) {
                this.sortDirection = sortDirection;
                this.sortExpression = sortExpression;
                this.currentPageNumber = 1;
                this.delaySearch = false;
                this.executeSearch();
            }
            private pagingCustomers(currentPageNumber: number) {
                this.currentPageNumber = currentPageNumber;
                this.delaySearch = false;
                this.executeSearch();
            }
            private pageSizeChanged(pageSize: number) {
                this.pageSize = pageSize;
                this.currentPageNumber = 1;
                this.delaySearch = false;
                this.executeSearch();
            }
            public reset(): void {
                this.Title = '';
                this.currentPageNumber = 1;
                this.delaySearch = false;
                this.executeSearch();
            }
            public search(): void {
                this.currentPageNumber = 1;
                this.delaySearch = false;
                this.executeSearch();
            }
}
