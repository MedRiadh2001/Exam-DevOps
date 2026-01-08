import { Component, OnInit } from '@angular/core';
import { VoituresService } from '../../services/voitures.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    standalone:true,
    imports:[FormsModule, CommonModule, RouterModule],
  selector: 'app-voiture-list',
  templateUrl: './voiture-list.component.html'
})
export class VoitureListComponent implements OnInit {
  voitures: any[] = [];
  selectedVoiture: any = null;

  constructor(private voitureService: VoituresService) {}

  ngOnInit(): void {
    this.loadVoitures();
  }

  loadVoitures() {
    this.voitureService.getAll().subscribe((data) => {
      this.voitures = data as any;
    });
  }

  deleteVoiture(id: string) {
    Swal.fire({
      title: 'Confirmer la suppression?',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.voitureService.delete(id).subscribe(() => {
          Swal.fire('Supprimé!', 'La voiture a été supprimée.', 'success');
          this.loadVoitures();
        });
      }
    });
  }

  openModal(voiture: any) {
    this.selectedVoiture = voiture;
    const modal: any = new (window as any).bootstrap.Modal(document.getElementById('voitureModal'));
    modal.show();
  }
}