import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { SpotifyService } from "../services/spotify.service";

export const userIsOnResolver = () => new Promise(async (res, rej) => {
    const spotifyService = inject(SpotifyService);
    const router = inject(Router);
    const token = localStorage.getItem('token');

    const unAuthenticated = () => {
        localStorage.clear();
        router.navigateByUrl('/login');
        rej('USER UNAUTHENTICATED!')
        return false;
    }

    if (!token) {
        return unAuthenticated();
    }

    const UserCreated = await spotifyService.startUser();
    if (UserCreated) {
        res(true);
    }
    else {
        res(unAuthenticated());
    }

    return false;
})