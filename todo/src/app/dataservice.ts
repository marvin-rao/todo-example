import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { ListItem } from './list-item/list-item.component';


@Injectable({ providedIn: 'root' })
export class DataService {
    private dataSubject: BehaviorSubject<Array<ListItem>> = new BehaviorSubject([]);
    public readonly onDataSubject: Observable<Array<ListItem>> = this.dataSubject.asObservable();

    constructor(private http: HttpClient) {
        this.init();
    }

    private init(): void {
        const url = 'https://todo-example-server.vercel.app/db.json';
        this.http.get(url).subscribe((result: Array<ListItem>) => {
            this.dataSubject.next(result);
        });
    }

    public update(index, item: ListItem): void {
        const data = this.dataSubject.value;
        data[index] = item;

        this.dataSubject.next(data);
    }

    public add(item: ListItem): void {
        const data = this.dataSubject.value;
        data.push(item);

        this.dataSubject.next(data);
    }

}
