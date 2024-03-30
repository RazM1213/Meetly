import { Contact } from "expo-contacts";
import { SavedLocation } from "./Location";

export type Pool = {
    id: string;
    name: string;
    creationDate: number;
    selectedContacts: Contact[];
    mutualFriends: boolean;
    active: boolean;
    location: SavedLocation;
};
