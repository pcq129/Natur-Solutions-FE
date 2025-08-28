import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-contact',
  imports: [MatButton, MatIcon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {


  getCardClass(){
    return "blue";
  }
}
