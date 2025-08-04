import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SanctionAmountService {

  private sanctionAmountSource = new BehaviorSubject<number>(0);
  currentSanctionAmount = this.sanctionAmountSource.asObservable();

  updateSanctionAmount(amount: number) {
    this.sanctionAmountSource.next(amount);


  }


  private maturityDateSource = new BehaviorSubject<string | null>(null);
  currentMaturityDate$ = this.maturityDateSource.asObservable();

  // Method to update the maturity date
  updateMaturityDate(date: string | null) {
    this.maturityDateSource.next(date);
  }

  private sanctionAmount1Source = new BehaviorSubject<number | null>(null);
  currentSanctionAmount$ = this.sanctionAmount1Source.asObservable();

  // Method to update the sanction amount
  updateSanctionAmount1(amount: number | null) {
    this.sanctionAmount1Source.next(amount);
  }

  constructor() { }
}
