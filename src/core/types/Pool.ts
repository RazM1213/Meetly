import { Contact } from "expo-contacts";
import { LocationAndRange } from "./LocationAndRange";

export type Pool = {
    id: string;
    name: string;
    creationDate: number;
    selectedContacts: Contact[];
    mutualFriends: boolean;
    active: boolean;
    location: LocationAndRange;
};
