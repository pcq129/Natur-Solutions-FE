import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch-office-container',
  imports: [],
  templateUrl: './branch-office-container.html',
  styleUrl: './branch-office-container.scss',
})
export class BranchOfficeContainer implements OnInit {
  ngOnInit(): void {
    this.CurrentBranch=this.BranchData()[this.pointer];
  }

  BranchData = input.required<IBranchOffice[]>();

  next() {
    if(this.pointer+1<this.BranchData().length){
      this.pointer++;
    }
    this.CurrentBranch=this.BranchData()[this.pointer];

  }
  previous() {
    if(this.pointer-1 >= 0){
      this.pointer--;
    }
    this.CurrentBranch=this.BranchData()[this.pointer];
  }
  pointer = 0;
  CurrentBranch: IBranchOffice | null = null;
}

export interface IBranchOffice {
  name: string;
  address: string;
  email?: string;
  moble?: string | number;
  location?: string;
}
