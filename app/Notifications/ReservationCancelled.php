<?php

namespace App\Notifications;

use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationCancelled extends Notification
{
    use Queueable;

    protected $reservation;

    /**
     * Constructeur.
     *
     * @param Reservation $reservation
     */
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    /**
     * Détermine les canaux de notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Détermine le contenu du message email.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Annulation de votre réservation')
            ->greeting('Bonjour ' . $notifiable->nom . ',')
            ->line('Nous vous informons que votre réservation a été annulée.')
            ->line('Détails de la réservation annulée :')
            ->line('Véhicule : ' . $this->reservation->vehicule->marque . ' ' . $this->reservation->vehicule->modele)
            ->line('Date de départ : ' . Carbon::parse($this->reservation->date_depart)->format('d/m/Y'))
            ->line('Date de retour : ' . Carbon::parse($this->reservation->date_retour)->format('d/m/Y'))
            ->line('Motif du voyage : ' . $this->reservation->motif)
            ->line('Type de voyage : ' . ucfirst($this->reservation->type_voyage))
            ->line('Si vous avez des questions, n\'hésitez pas à nous contacter.')
            ->line('Merci pour votre compréhension.')
            ->salutation('Cordialement, L\'équipe de gestion des réservations');
    }
}
