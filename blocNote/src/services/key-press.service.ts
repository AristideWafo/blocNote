import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyPressService {
  private behaviorSubject = new BehaviorSubject<number>(0);

  // Observable que les composants peuvent s'abonner pour recevoir des valeurs
  public behaviorSubject$ = this.behaviorSubject.asObservable();

  // Méthode pour émettre une nouvelle valeur
  closeInput(newValue: number) {
    this.behaviorSubject.next(newValue);
  }
}
