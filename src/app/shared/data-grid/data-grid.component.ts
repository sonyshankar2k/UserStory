

import { Component, EventEmitter, Injectable, Output, Input, OnChanges, OnInit, Host} from '@angular/core';
import { DataGridColumn, DataGridSorter, DataGridButton, DataGridSortInformation, DataGridEventInformation } from './data-grid.core';
import { TransactionalBase } from '../../core/entities/transactionalBase.entity';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'data-grid',
    styleUrls: ['data-grid.css'],
    // tslint:disable-next-line:use-input-property-decorator
    inputs: ['rows: rows', 'columns: columns'],
    templateUrl: 'data-grid.component.html'
})

@Injectable()
export class DataGridComponent implements OnInit {

    public columns: Array<DataGridColumn>;
    public rows: Array<any>;
    public sorter: DataGridSorter;
    public pageSizes = [];
    public sortColumn: string;
    public sortDesending: Boolean;
    public sortAscending: Boolean;

    @Output() datagridEvent;

    @Input() pageSize: number;

    public disableFirstPageButton: Boolean;
    public disablePreviousPageButton: Boolean;
    public disableNextPageButton: Boolean;
    public disableLastPageButton: Boolean;
    public pageSizeForGrid: number;

    public currentPageNumber: number;
    public totalRows: number;
    public totalPages: number;
    public itemNumberBegin: number;
    public itemNumberEnd: number;

    constructor() {
        this.sorter = new DataGridSorter();
        this.datagridEvent = new EventEmitter();

        this.disableNextPageButton = false;
        this.disableLastPageButton = false;
        this.disableFirstPageButton = false;
        this.disablePreviousPageButton = false;

        this.disableFirstPageButton = true;
        this.disablePreviousPageButton = true;

        this.pageSizes.push(5);
        this.pageSizes.push(10);
        this.pageSizes.push(15);
        this.pageSizeForGrid = this.pageSize;

        this.sortColumn = '';
        this.sortAscending = false;
        this.sortDesending = false;
    }

    public ngOnInit() {}

    public databind(transactionalInformation: TransactionalBase) {
        this.currentPageNumber = transactionalInformation.currentPageNumber;
        this.totalPages = transactionalInformation.totalPages;
        this.totalRows = transactionalInformation.totalRows;
        this.itemNumberBegin = ((this.currentPageNumber - 1) * this.pageSize) + 1;
        this.itemNumberEnd = this.currentPageNumber * this.pageSize;
        if (this.itemNumberEnd > this.totalRows) {
            this.itemNumberEnd = this.totalRows;
        }

        this.disableNextPageButton = false;
        this.disableLastPageButton = false;
        this.disableFirstPageButton = false;
        this.disablePreviousPageButton = false;

        if (this.currentPageNumber === 1) {
            this.disableFirstPageButton = true;
            this.disablePreviousPageButton = true;
        }

        if (this.currentPageNumber === this.totalPages) {
            this.disableNextPageButton = true;
            this.disableLastPageButton = true;
        }
    }

    public sortData(key) {

        const sortInformation: DataGridSortInformation = this.sorter.sort(key, this.rows);

        if (this.sortColumn !== key) {
            this.sortAscending = true;
            this.sortDesending = false;
            this.sortColumn = key;
        }
        // tslint:disable-next-line:one-line
        else {
            this.sortAscending = !this.sortAscending;
            this.sortDesending = !this.sortDesending;
        }

        const eventInformation = new DataGridEventInformation();

        eventInformation.EventType = 'Sorting';
        eventInformation.Direction = sortInformation.Direction;
        eventInformation.SortDirection = sortInformation.SortDirection;
        eventInformation.SortExpression = sortInformation.Column;
        this.datagridEvent.emit({
            value: eventInformation
        });

    }

    public selectedRow(i: number) {
        const eventInformation = new DataGridEventInformation();
        eventInformation.EventType = 'ItemSelected';
        eventInformation.ItemSelected = i;
        this.datagridEvent.emit({
            value: eventInformation
        });
    }

    public buttonClicked(buttonName: string, i: number) {

        const eventInformation = new DataGridEventInformation();
        eventInformation.EventType = 'ButtonClicked';
        eventInformation.ButtonClicked = buttonName;
        eventInformation.ItemSelected = i;

        this.datagridEvent.emit({
            value: eventInformation
        });
    }

    public pageSizeChanged(newPageSize) {

        const eventInformation = new DataGridEventInformation();
        eventInformation.EventType = 'PageSizeChanged';
        // tslint:disable-next-line:radix
        this.pageSize = parseInt(newPageSize) + 0;
        eventInformation.PageSize = this.pageSize;

        this.datagridEvent.emit({
            value: eventInformation
        });
    }

    public buttonNextPage() {

        const currentPageNumber = this.currentPageNumber + 1;

        const eventInformation = new DataGridEventInformation();
        eventInformation.EventType = 'PagingEvent';
        eventInformation.CurrentPageNumber = currentPageNumber;

        this.datagridEvent.emit({
            value: eventInformation
        });
    }

    public buttonPreviousPage() {

        this.currentPageNumber = this.currentPageNumber - 1;

        const eventInformation = new DataGridEventInformation();
        eventInformation.EventType = 'PagingEvent';
        eventInformation.CurrentPageNumber = this.currentPageNumber;

        this.datagridEvent.emit({
            value: eventInformation
        });
    }

    public buttonFirstPage() {

        this.currentPageNumber = 1;

        const eventInformation = new DataGridEventInformation();
        eventInformation.EventType = 'PagingEvent';
        eventInformation.CurrentPageNumber = this.currentPageNumber;

        this.datagridEvent.emit({
            value: eventInformation
        });
    }

    public buttonLastPage() {

        this.currentPageNumber = this.totalPages;

        const eventInformation = new DataGridEventInformation();
        eventInformation.EventType = 'PagingEvent';
        eventInformation.CurrentPageNumber = this.currentPageNumber;

        this.datagridEvent.emit({
            value: eventInformation
        });
    }
}
