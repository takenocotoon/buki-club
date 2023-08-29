import { bukiStars } from './buki-stars';
export const localStorageKey = 'buki-stars';


export function getLocalStorageData(): any | null {
    const jsonData = localStorage.getItem(localStorageKey);
    if (jsonData) {
        try {
            const parsedData = JSON.parse(jsonData);
            return { ...parsedData };
        } catch (error) {
        console.error('Error parsing JSON data:', error);
        return {};
        }
    }
    return {};
}


export function saveLocalStorageData() {
    try {
        // let json = JSON.stringify(localStorageData);
        localStorage.setItem(localStorageKey, JSON.stringify({
            'markedWeapons':bukiStars.markedWeapons,
            'filterOptions':bukiStars.filterOptions,
            'settings':bukiStars.settings,
        }));
    } catch (error) {
        console.error('Error while saving object to LocalStorage:', error);
    }
}

export const localStorageData = getLocalStorageData();
