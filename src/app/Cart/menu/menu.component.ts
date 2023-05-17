import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuService } from 'src/app/Cart/menu/menu.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  showList: any = '';
  selectedItem: any; // Declare the selectedItem property
  typeResponse: any[] = [];
  typeGetData: any[] = [];

  

  addType = this.formBuilder.group({
    typeName: [null, Validators.required],
    
  });


   
  

  showForm: boolean = false;
  newSectionName: string = '';

  toggleList(type: 'veg' | 'non-veg' | string) {
    if (type === 'veg' || type === 'non-veg') {
      if (this.showList === type) {
        this.showList = '';
      } else {
        this.showList = type;
      }
    } else {
      this.showList = type;
    }
  }





  openDetails(item: any) {
    this.selectedItem = item;
  }

  closeDetails() {
    this.selectedItem = null;
  }

  openSectionForm() {
    this.showForm = true;
  }


  showPopup: boolean = false;

  openpopup() {
    this.showPopup = true;
  }

  closepopup() {
    setTimeout(() => {
      this.showPopup = false;
    }, 1000);
    const formData = new FormData();
    formData.append('typeName', this.addType.get('typeName')?.getRawValue());
    this.userService.saveType(formData).subscribe((response) => {
      this.typeResponse = response.typeName;
    });
    setTimeout(() => {
      this.userService.getType().subscribe((data) => {
        this.typeGetData = data;
      });
    }, 2000);
  }

  userDatalist: any[] = []; // Define the property to hold the retrieved user data

  constructor(
    private userService: MenuService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getDataFromBackend(); // Call the method to retrieve user data

    console.log(this.getDataFromBackend());
  }

  getDataFromBackend(): any {
    this.userService.getDataFromBackend().subscribe(
      (response:any) => {
        this.userDatalist = response;
        console.log(
          JSON.stringify(this.userDatalist) + 'User data retrieved successfully'
        );
      },
      (error) => {
        console.log('Error retrieving user data:', error);
      }
    );
  }

  getFilteredItems(typeId: string): any[] {
    return this.userDatalist.filter((item) => item.type_id === typeId);
  }


  isTypeRendered(typeId: string): boolean {
    return this.userDatalist.some((item) => item.type_id === typeId && this.showList === typeId);
  }
  
  getUniqueTypes(): any[] {
    const uniqueTypes: any[] = [];
    this.userDatalist.forEach(item => {
      const existingType = uniqueTypes.find(type => type.type_id === item.type_id);
      if (!existingType) {
        uniqueTypes.push(item);
      }
    });
    return uniqueTypes;
  }
  
  deleteItem(item_id: any) {
    console.log(item_id)
    if (item_id) {
      this.userService.deleteItem(item_id)
        .subscribe(
          (response: any) => {
            console.log('Item deleted successfully:', response);
            // Handle success response
          },
          (error: any) => {
            console.error('Error deleting item:', error);
            // Handle error
          }
        );
    } else {
      console.error('Item ID not found');
      // Handle error
    }
  }
  

 
}

