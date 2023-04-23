<?php

namespace App\Mail;

use App\Models\Game;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WinnerCompetition extends Mailable
{
    use Queueable, SerializesModels;

    protected $user;
    protected $game;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, Game $game)
    {
        $this->user = $user;
        $this->game = $game;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.winner-competition')->with([
            'user' => $this->user,
            'game' => $this->game
        ]);
    }
}
