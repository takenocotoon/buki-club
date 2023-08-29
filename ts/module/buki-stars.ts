"use strict";

import { bukiList } from './buki-list';
// import { lS } from './local-storage';

class BukiStars {
    public markedWeapons: { [key: number]: number } = {};
    public filterOptions = {
        type: [] as string[],
        sub: [] as string[],
        sp: [] as string[],
        season: [] as string[],
        minor: true,
        scope: true,
        hero: true,
    };
    public settings = {
        theme: 'lite',
        mode: 1,
        language: 'ja',
    };
    public weaponsList = bukiList.concat();
}


export const bukiStars = new BukiStars();
