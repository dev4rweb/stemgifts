@component('mail::message')
# SteamGift

<img src="{{ $game->main_image }}" alt="image">

## {{ $user->name }}
You win in competition - {{ $game->name }}.
### Your key {{ $user->key }}

@component('mail::button', ['url' => 'http://127.0.0.1:8000/user-achievements'])
Check it!
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
