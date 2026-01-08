import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { VoituresService } from '../../services/voitures.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[FormsModule, CommonModule, RouterModule],
  selector: 'app-voiture-form',
  templateUrl: './voiture-form.component.html'
})
export class VoitureFormComponent implements OnInit {
  voiture: any = {
    marque: '',
    description: '',
    caracteristiques: [],
    image: '',
    prix: 0
  };
  editMode = false;

  constructor(
    private voitureService: VoituresService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.voitureService.get(id).subscribe((data) => {
        this.voiture = data;
      });
    }
  }
  selectedFile: File | null = null;

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

uploadImageAndSave() {
  if (!this.selectedFile) {
    this.save();
    return;
  }

  const formData = new FormData();
  formData.append('image', this.selectedFile);

  this.voitureService.uploadImage(formData).subscribe({
    next: (res: any) => {
      this.voiture.image = res.imageUrl;
      this.save();
    },
    error: (err) => console.error('Erreur d\'upload :', err)
  });
}


  save() {
    if (this.editMode) {
      this.voitureService.update(this.voiture.id, this.voiture).subscribe(() => {
        Swal.fire('Succès', 'Voiture mise à jour', 'success');
        this.router.navigate(['/']);
      });
    } else {
      this.voitureService.create(this.voiture).subscribe(() => {
        Swal.fire('Succès', 'Voiture ajoutée', 'success');
        this.router.navigate(['/']);
      });
    }
  }

  updateCaracteristiques(value: string): void {
    this.voiture.caracteristiques = value.split(',').map(c => c.trim());
  }
  
}