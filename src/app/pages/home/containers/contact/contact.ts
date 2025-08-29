import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { IContact } from '../../interfaces';
@Component({
  selector: 'app-contact',
  imports: [MatButton, MatIcon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactsData = input.required<IContact[]>();

  getCardClass(){
    return "blue";
  }
}
