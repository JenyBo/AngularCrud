import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  statuslist = ["New", "Old"];
  phoneForm !:  FormGroup;
  actionBtn : string = "Save";

  constructor(private formBuilder: FormBuilder ,
    private api : ApiService ,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) {
  }

  ngOnInit(): void {
    this.phoneForm = this.formBuilder.group({
      phoneName : ['' , Validators.required],
      phoneOperatingsystem : ['' , Validators.required],
      date : ['' , Validators.required],
      status : ['' , Validators.required],
      price : ['' , Validators.required],
      Comment : ['' , Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.phoneForm.controls['phoneName'].setValue(this.editData.phoneName);
      this.phoneForm.controls['phoneOperatingsystem'].setValue(this.editData.phoneOperatingsystem);
      this.phoneForm.controls['date'].setValue(this.editData.date);
      this.phoneForm.controls['status'].setValue(this.editData.status);
      this.phoneForm.controls['price'].setValue(this.editData.price);
      this.phoneForm.controls['Comment'].setValue(this.editData.Comment);
    }

  }
  addPhone(){
    if(!this.editData){
        if(this.phoneForm.valid){
          this.api.postPhone(this.phoneForm.value)
          .subscribe({
            next:(res) => {
              alert("Phone added successfully");
              this.phoneForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Failed to add phone")
            }
          })
        }
    }else{
      this.updatePhone();
    }
  }
  updatePhone(){
    this.api.putPhone(this.phoneForm.value , this.editData.id)
    .subscribe({
      next:(res) => {
        alert("Phone updated successfully");
        this.phoneForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("Failed to update phone")
      }
    })
  }
}
